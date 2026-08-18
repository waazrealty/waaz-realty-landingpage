import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'team',
  title: 'Team',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      role: 'role',
      media: 'photo',
    },
    prepare({ title, role, media }) {
      return {
        title: title,
        subtitle: role,
        media: media
      }
    },
  },
})
