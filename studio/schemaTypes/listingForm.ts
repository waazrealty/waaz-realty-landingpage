import { defineArrayMember, defineField } from "sanity";

export default {
  name: 'listingForm',
  title: 'Listing Form Submission',
  type: 'document',
  fields: [
    defineField({
      name: 'fullname',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email().max(100),
    }),
    defineField({
      name: 'mobile',
      title: 'Mobile Number',
      type: 'string',
    }),
    defineField({
      name: 'ownerType',
      title: 'Owner Type',
      type: 'string',
      options: {
        list: ['Property Owner', 'Real Estate Agent'],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'listingType',
      title: 'Listing Type',
      type: 'string',
      options: {
        list: ['For Rent', 'For Sale', 'Short-Let'],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'propertyType',
      title: 'Property Type',
      type: 'string',
      options: {
        list: [
          'Fully Detached Duplex',
          'Semi Detached Duplex',
          'Terraced Duplex',
          'Blocks of Flats/Apartment',
          'Mini Flat',
          'Self Contain',
          'Office Space',
          'Retail Shop',
          'Vacant Land',
        ],
      },
      
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Location / Address',
      type: 'string',
      validation: (Rule) => Rule.required().max(255),
    }),
    defineField({
      name: 'expectedPrice',
      title: 'Expected Price (₦)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'bedrooms',
      title: 'Bedrooms',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [defineArrayMember({type: 'image', options: {hotspot: true}})],
    }),
  ],
  preview: {
    select: {
      title: 'fullname',
      subtitle: 'email',
    },
  },
}