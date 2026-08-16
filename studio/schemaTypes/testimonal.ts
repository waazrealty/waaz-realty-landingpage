export default {
  name: 'testimonal',
  title: 'Testimonal',
  type: 'document',
  fields: [
    {
      name: 'author',
      title: 'Author',
      type: 'string',
    },
    {
      name: 'quote',
      title: 'Quote',
      type: 'string',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true
      }
    },
  ],

  preview: {
    select: {
      title: 'author',
      location: 'location',
      // media: 'mainImageUrl',
    },
  },
}
