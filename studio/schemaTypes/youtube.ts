import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'youtube',
  title: 'YouTube Embed',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'YouTube URL',
      type: 'url',
      validation: (Rule) =>
        Rule.required().uri({scheme: ['https'], allowRelative: false}),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'caption',
      subtitle: 'url',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'YouTube video',
        subtitle,
      }
    },
  },
})
