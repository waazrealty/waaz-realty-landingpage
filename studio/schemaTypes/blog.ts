import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'blog',
  title: 'Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'string',
      description: 'A short category or keyword for this post.',
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      description: 'Reading time or estimated duration for this post.',
    }),
    defineField({
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Active', value: 'active'},
          {title: 'Inactive', value: 'inactive'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
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
      title: 'title',
      media: 'image',
      updatedAt: '_updatedAt',
      createdAt: '_createdAt',
    },
    prepare({title, media, updatedAt, createdAt}) {
      const subtitle = updatedAt
        ? `Updated ${new Date(updatedAt).toLocaleDateString('en-US')}`
        : createdAt
        ? `Created ${new Date(createdAt).toLocaleDateString('en-US')}`
        : 'No date available'
      return {
        title,
        subtitle,
        media,
      }
    },
  },
})
