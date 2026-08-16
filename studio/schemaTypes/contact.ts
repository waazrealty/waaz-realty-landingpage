import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contact',
  title: 'Contact',
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
      name: 'discussion',
      title: 'Discussion',
      type: 'string',
    }),
    defineField({
      name: 'message',
      title: 'More Information',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'fullname',
      createdAt: '_createdAt',
    },
    prepare({title, createdAt}) {
      const subtitle = `Contact Message Submitted at ${new Date(createdAt).toLocaleDateString('en-US')}`
      return {
        title,
        subtitle,
      }
    },
  },
})
