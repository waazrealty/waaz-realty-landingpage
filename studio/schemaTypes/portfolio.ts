import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'portfolio',
  title: 'Portfolio',
  type: 'document',
  fields: [
    defineField({
      name: 'daysInMarket',
      title: 'Days In Market',
      type: 'string',
    }),
    defineField({
      name: 'openPrice',
      title: 'Open Price',
      type: 'number',
      description: '250000000',
      validation: (Rule) => Rule.integer().positive(),
    }),
    defineField({
      name: 'closePrice',
      title: 'Close Price',
      type: 'number',
      description: '250000000',
      validation: (Rule) => Rule.integer().positive(),
    }),
    defineField({
      name: 'listing',
      title: 'Listing',
      type: 'reference',
      to: [{ type: 'listing' }],
      validation: (Rule) =>
      Rule.required().custom(async (value, context) => {
        if (!value?._ref) {
          return true
        }

        const {getClient, document} = context

        const client = getClient({apiVersion: '2026-08-07'})

        const existing = await client.fetch(
          `count(
            *[
              _type == "portfolio" &&
              listing._ref == $listingId &&
              !(_id in [$currentId, "drafts." + $currentId])
            ]
          )`,
          {
            listingId: value._ref,
            currentId: document?._id?.replace(/^drafts\./, ''),
          }
        )

        return existing === 0
          ? true
          : 'This listing already has a portfolio.'
      }),
    }),
    defineField({
      name: 'feedbacks',
      title: 'Feedbacks',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'name', title: 'Name', type: 'string'}),
            defineField({name: 'type', title: 'Type', type: 'string'}),
            defineField({name: 'quote', title: 'Quote', type: 'string'}),
          ],
        }),
      ],
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
        media: media
      }
    },
  },
})
