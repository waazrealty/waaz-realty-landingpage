import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'client',
  title: 'Client',
  type: 'document',
  fields: [
    defineField({
      name: 'fullName',
      title: 'Full Name',
      type: 'string',
      validation: (Rule) => Rule.required().error('Full name is required'),
    }),
    defineField({
      name: 'phoneNumber',
      title: 'Phone Number',
      type: 'string',
      validation: (Rule) => Rule.required().error('Phone number is required'),
    }),
    defineField({
      name: 'emailAddress',
      title: 'Email Address',
      type: 'string',
      // optional, but if provided, we can validate as email
      validation: (Rule) => Rule.email().warning('Must be a valid email address'),
    }),
    defineField({
      name: 'relationshipStatus',
      title: 'Relationship Status',
      type: 'string',
      options: {
        list: [
          { title: 'Lead', value: 'Lead' },
          { title: 'Prospect', value: 'Prospect' },
          { title: 'Client', value: 'Client' },
          { title: 'Former Client', value: 'Former Client' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'leadSource',
      title: 'Lead Source',
      type: 'string',
      options: {
        list: [
          { title: 'WhatsApp', value: 'WhatsApp' },
          { title: 'Instagram', value: 'Instagram' },
          { title: 'Website', value: 'Website' },
          { title: 'Referral', value: 'Referral' },
          { title: 'Walk-in', value: 'Walk-in' },
          { title: 'Phone Call', value: 'Phone Call' },
          { title: 'External Agent', value: 'External Agent' },
          { title: 'Other', value: 'Other' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'minimumBudget',
      title: 'Minimum Budget',
      type: 'number',
      validation: (Rule) => Rule.min(0).precision(2),
    }),
    defineField({
      name: 'maximumBudget',
      title: 'Maximum Budget',
      type: 'number',
      validation: (Rule) => Rule.min(0).precision(2),
    }),
    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      options: {
        list: [
          { title: 'NGN', value: 'NGN' },
          { title: 'USD', value: 'USD' },
          { title: 'GBP', value: 'GBP' },
          { title: 'EUR', value: 'EUR' },
          { title: 'Other', value: 'Other' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'preferredLocations',
      title: 'Preferred Locations',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .error('At least one preferred location is required'),
      options: {
        layout: 'tags', // or 'list' – user can add custom strings
      },
    }),
    defineField({
      name: 'propertyTypes',
      title: 'Property Types',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Flats & Apartments', value: 'flats-apartments' },
          { title: 'Warehouse', value: 'warehouse' },
          { title: 'Lands', value: 'lands' },
          { title: 'Maisonette', value: 'maisonette' },
          { title: 'Penthouse', value: 'penthouse' },
          { title: 'Mini Flats', value: 'mini-flats' },
          { title: 'Terraced Duplex', value: 'terraced-duplex' },
          { title: 'Detached Duplex', value: 'detached-duplex' },
          { title: 'Semi Detached Duplex', value: 'semi-detached-duplex' },
          { title: 'Commercial', value: 'commercial' },
          { title: 'Bungalow', value: 'bungalow' },
          { title: 'Duplex', value: 'duplex' },
        ],
      },
      validation: (Rule) =>
        Rule.required()
          .min(1)
          .error('At least one property type is required'),
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'fullName',
      subtitle: 'phoneNumber',
      status: 'relationshipStatus',
    },
    prepare(selection) {
      const { title, subtitle, status } = selection;
      return {
        title: title || 'Unnamed Client',
        subtitle: `${subtitle || ''}${status ? ` — ${status}` : ''}`,
      };
    },
  },
});