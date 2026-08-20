import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@sanity/client';
import formidable from 'formidable';
import fs from 'fs';

// Disable Next.js default body parser so we can handle multipart data
export const config = {
  api: {
    bodyParser: false,
  },
};

const writeToken = process.env.NEXT_PUBLIC_SANITY_WRITE_TOKEN;

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  token: writeToken,
  useCdn: false,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (!writeToken) {
    console.error('Missing SANITY_WRITE_TOKEN. Add it to .env and restart.');
    return res.status(500).json({
      message: 'Server is missing the Sanity write token.',
    });
  }

  // Parse the multipart form data
  const form = formidable({
    multiples: true,
    maxFileSize: 5 * 1024 * 1024, // 5MB per file (adjust as needed)
  });

  try {
    const { fields, files } = await new Promise<{ fields: formidable.Fields; files: formidable.Files }>(
      (resolve, reject) => {
        form.parse(req, (err: any, fields: any, files: any) => {
          if (err) reject(err);
          else resolve({ fields, files });
        });
      }
    );

    // Extract text fields (they come as arrays)
    const {
      fullname,
      email,
      mobile,
      ownerType,
      listingType,
      propertyType,
      address,
      expectedPrice,
      bedrooms,
    } = fields;

    // Validate required fields (mirroring listingForm schema)
    const requiredFields = [
      { key: 'fullname', value: fullname?.[0] },
      { key: 'email', value: email?.[0] },
      { key: 'ownerType', value: ownerType?.[0] },
      { key: 'listingType', value: listingType?.[0] },
      { key: 'propertyType', value: propertyType?.[0] },
      { key: 'address', value: address?.[0] },
      { key: 'expectedPrice', value: expectedPrice?.[0] },
    ];

    const missing = requiredFields.filter((f) => !f.value);
    if (missing.length > 0) {
      return res.status(400).json({
        message: `Missing required fields: ${missing.map((f) => f.key).join(', ')}`,
      });
    }

    // Prepare document data
    const docData = {
      _type: 'listingForm',
      fullname: fullname![0].trim(),
      email: email![0].trim(),
      mobile: mobile?.[0]?.trim() || '',
      ownerType: ownerType![0].trim(),
      listingType: listingType![0].trim(),
      propertyType: propertyType![0].trim(),
      address: address![0].trim(),
      expectedPrice: parseFloat(expectedPrice![0]),
      bedrooms: parseInt(bedrooms![0], 10),
    };

    // Handle image uploads (if any)
    const imageFiles = files.images as formidable.File[] | undefined;
    const imageAssets = [];

    if (imageFiles && imageFiles.length > 0) {
      for (const file of imageFiles) {
        // Upload each file to Sanity as an asset
        const asset = await client.assets.upload(
          'image',
          fs.createReadStream(file.filepath),
          {
            filename: file.originalFilename || 'image.jpg',
          }
        );
        imageAssets.push({
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id,
          },
        });
      }
    }

    // Create the full document in Sanity
    const result = await client.create({
      ...docData,
      images: imageAssets,
    });

    return res.status(200).json({
      success: true,
      message: 'Listing submitted successfully',
      id: result._id,
    });
  } catch (error) {
    console.error('Sanity listing submission error:', error);
    return res.status(500).json({
      message: 'Failed to submit the form. Please check the Sanity token permissions and try again.',
    });
  }
}