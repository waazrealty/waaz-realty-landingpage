import type { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@sanity/client';

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

  const { fullname, email, mobile, discussion, message } = req.body || {};

  if (!fullname || !email || !mobile || !discussion || !message) {
    return res.status(400).json({ message: 'Please complete all required fields.' });
  }

  if (!writeToken) {
    console.error('Missing SANITY_WRITE_TOKEN. Add it to web/.env and restart the app.');
    return res.status(500).json({
      message: 'Server is missing the Sanity write token. Add SANITY_WRITE_TOKEN to the environment and restart the app.',
    });
  }

  try {
    await client.create({
      _type: 'contact',
      fullname: String(fullname).trim(),
      email: String(email).trim(),
      mobile: String(mobile).trim(),
      discussion: String(discussion).trim(),
      message: String(message).trim(),
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Sanity contact submission error:', error);
    return res.status(500).json({ message: 'Failed to submit the form. Please check the Sanity token permissions and try again.' });
  }
}
