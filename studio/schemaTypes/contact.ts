import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'contact',
  title: 'Website Contact Enquires',
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
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'new',
      options: {
        list: [
          {title: 'New', value: 'new'},
          {title: 'Contacted', value: 'contacted'},
          {title: 'In Progress', value: 'in-progress'},
          {title: 'Resolved', value: 'resolved'},
          {title: 'Spam', value: 'spam'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
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
