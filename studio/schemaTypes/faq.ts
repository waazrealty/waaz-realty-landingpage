import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'faq',
  title: 'Faq',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'question',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'blockContent',
    }),
  ],

  orderings: [
    {
      title: 'Last updated',
      name: 'updatedAtDesc',
      by: [{field: '_updatedAt', direction: 'desc'}],
    },
    {
      title: 'Created date',
      name: 'createdAtDesc',
      by: [{field: '_createdAt', direction: 'desc'}],
    },
  ],

  preview: {
    select: {
      title: 'question',
      updatedAt: '_updatedAt',
      createdAt: '_createdAt',
    },
    prepare({title, updatedAt, createdAt}) {
      const subtitle = updatedAt
        ? `Updated ${new Date(updatedAt).toLocaleDateString('en-US')}`
        : createdAt
        ? `Created ${new Date(createdAt).toLocaleDateString('en-US')}`
        : 'No date available'
      return {
        title,
        subtitle,
      }
    },
  },
})
