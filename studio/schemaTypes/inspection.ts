import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'inspection',
  title: 'Inspection',
  type: 'document',
  fields: [
    defineField({
      name: 'fullname',
      title: 'Full Name',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'mobile',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'listing',
      title: 'Listing',
      type: 'reference',
      to: [{ type: 'listing' }],
      description: 'The property this inspection request is for.',
    }),
    defineField({
      name: 'message',
      title: 'More Information',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      listingTitle: 'listing.title',
      createdAt: '_createdAt',
      media: 'listing.gallery.0',
    },
    prepare({ listingTitle, createdAt, media }) {
      return {
        title: listingTitle,
        subtitle: `Inspection for: ${listingTitle} - Submitted ${new Date(createdAt).toLocaleDateString('en-US')}`,
        media: media
      }
    },
  },
})
