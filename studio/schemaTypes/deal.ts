import {
  ConditionalPropertyCallbackContext,
  defineArrayMember,
  defineField,
  defineType,
} from 'sanity'

import AutoAskingPriceInput from './components/AutoAskingPriceInput'
import AutoDocumentNameInput from './components/AutoDocumentNameInput'
import CalculatedAmountPaidInput from './components/CalculatedAmountPaidInput'
import CalculatedRemainingAmountInput from './components/CalculatedRemainingAmountInput'
import PaymentSummaryInput from './components/PaymentSummaryInput'

/**
 * Returns true when the deal has been closed
 * either as won or lost.
 */
const isDealClosed = ({
  document,
}: ConditionalPropertyCallbackContext): boolean => {
  return (
    document?.dealStage === 'closed-won' ||
    document?.dealStage === 'closed-lost'
  )
}


export default defineType({
  name: 'deal',
  title: 'Deal',
  type: 'document',
  initialValue: () => {
    // Use crypto.randomUUID() if available (modern browsers), otherwise fallback
    const generateId = () => {
      if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
      }
      // Fallback: timestamp + random hex (still very unlikely to collide)
      return Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 8);
    };
    const uniqueId = generateId();
    // You can format it as you like, e.g., "DEAL-" + first 8 chars of UUID
    const code = `DEAL-${uniqueId.slice(0, 8)}`.toUpperCase();
    return { dealCode: code };
  },


  fieldsets: [
    {
      name: 'basicDeal',
      title: 'Basic Deal Information',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'inspection',
      title: 'Inspection',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'offers',
      title: 'Offer History',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'financials',
      title: 'Financial & Closing',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'activityFollowUp',
      title: 'Activity & Follow-Up',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'documents',
      title: 'Documentation',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'history',
      title: 'History & System Information',
      options: { collapsible: true, collapsed: false },
    },
  ],

  fields: [
    // ---------------------------------------------------------
    // BASIC DEAL INFORMATION
    // ---------------------------------------------------------
    defineField({
      name: "dealCode",
      title: "Deal Code",
      type: "string",
      readOnly: true,
      validation: (Rule) => Rule.required(),
      fieldset: 'basicDeal',
    }),
    defineField({
      name: 'lostReason',
      title: 'Lost Reason',
      type: 'string',
      fieldset: 'basicDeal',
      hidden: ({ document, value }) =>
        document?.dealStage !== 'closed-lost' && !value,
      options: {
        list: [
          { title: 'Price', value: 'price' },
          { title: 'Client Changed Mind', value: 'client-changed-mind' },
          { title: 'Property No Longer Available', value: 'property-no-longer-available' },
          { title: 'Chose Another Property', value: 'chose-another-property' },
          { title: 'Financing', value: 'financing' },
          { title: 'Documentation', value: 'documentation' },
          { title: 'Location', value: 'location' },
          { title: 'Timing', value: 'timing' },
          { title: 'Competitor', value: 'competitor' },
          { title: 'Other', value: 'other' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const document = context.document as { dealStage?: string } | undefined
          if (document?.dealStage === 'closed-lost' && !value) {
            return 'Lost Reason is required when the deal is closed lost.'
          }
          return true
        }),
    }),

    defineField({
      name: 'lostNotes',
      title: 'Lost Notes',
      type: 'blockContent',
      fieldset: 'basicDeal',
      hidden: ({ document, value }) =>
        document?.dealStage !== 'closed-lost' && !value,
    }),

    defineField({
      name: 'client',
      title: 'Client',
      type: 'reference',
      to: [{ type: 'client' }],
      weak: false,
      options: {
        disableNew: false,
      },
      readOnly: isDealClosed,
      validation: (Rule) => Rule.required(),
      fieldset: 'basicDeal',
    }),

    defineField({
      name: 'property',
      title: 'Property',
      type: 'reference',
      to: [{ type: 'listing' }],
      readOnly: isDealClosed,
      validation: (Rule) => Rule.required(),
      fieldset: 'basicDeal',
    }),

    defineField({
      name: 'dealType',
      title: 'Deal Type',
      type: 'string',
      options: {
        list: [
          {
            title: 'Rent',
            value: 'rent',
          },
          {
            title: 'Sale',
            value: 'sale',
          },
          {
            title: 'Short-let',
            value: 'short-let',
          },
        ],
        layout: 'dropdown',
      },
      readOnly: isDealClosed,
      validation: (Rule) => Rule.required(),
      fieldset: 'basicDeal',
    }),

    defineField({
      name: 'dealStage',
      title: 'Deal Stage',
      type: 'string',
      options: {
        list: [
          {
            title: 'New Enquiry',
            value: 'new-lead',
          },
          {
            title: 'Understanding Client Needs',
            value: 'qualifying',
          },
          {
            title: 'Inspection Scheduled',
            value: 'viewing-scheduled',
          },
          {
            title: 'Inspection Completed',
            value: 'viewing-completed',
          },
          {
            title: 'Offer & Negotiation',
            value: 'offer-negotiation',
          },
          {
            title: 'Due Diligence / Verification & Documentation',
            value: 'due-diligence',
          },
          {
            title: 'Deal Completed',
            value: 'closed-won',
          },
          {
            title: 'Deal Lost',
            value: 'closed-lost',
          },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
      fieldset: 'basicDeal',
    }),

    defineField({
      name: 'agentInvolvement',
      title: 'Agent Involvement',
      type: 'string',
      options: {
        list: [
          {
            title: 'Direct Deal',
            value: 'direct',
          },
          {
            title: 'External Agent Involved',
            value: 'external',
          },
        ],
        layout: 'radio',
      },
      initialValue: 'direct',
      readOnly: isDealClosed,
      validation: (Rule) => Rule.required(),
      fieldset: 'basicDeal',
    }),

    // ---------------------------------------------------------
    // ASSIGNED AGENT
    // ---------------------------------------------------------

    defineField({
      name: 'assignedInternalAgent',
      title: 'Assigned Internal Agent',
      type: 'reference',
      to: [{ type: 'agent' }],
      options: {
        filter: 'role == "internal"',
      },
      readOnly: isDealClosed,
      validation: (Rule) => Rule.required(),
      fieldset: 'basicDeal',
    }),


    defineField({
      name: 'externalAgent',
      title: 'External Agent',
      type: 'reference',
      to: [{ type: 'agent' }],
      hidden: ({
        parent,
      }) => parent?.agentInvolvement !== 'external',
      options: {
        filter: 'role == "external"',
        disableNew: false,
      },
      readOnly: isDealClosed,
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as {
            agentInvolvement?: string
          }

          if (
            parent?.agentInvolvement === 'external' &&
            !value
          ) {
            return 'External agent is required when an external agent is involved.'
          }

          return true
        }),
      fieldset: 'basicDeal',
    }),

    // ---------------------------------------------------------
    // PRICING
    // ---------------------------------------------------------

    defineField({
      name: 'askingPrice',
      title: 'Asking Price',
      type: 'number',

      description:
        'Automatically populated from the selected property price.',

      readOnly: isDealClosed,

      components: {
        input: AutoAskingPriceInput,
      },

      validation: (Rule) =>
        Rule.required().min(0),
      fieldset: 'basicDeal',
    }),

    // ---------------------------------------------------------
    // INSPECTION HISTORY
    // ---------------------------------------------------------

    defineField({
      name: 'inspectionHistory',
      title: 'Inspection History',
      type: 'array',
      description:
        'All inspections remain visible. Viewing Scheduled focuses on scheduling; Viewing Completed focuses on inspection results. Existing inspection records are never removed or replaced.',

      of: [
        defineArrayMember({
          type: 'object',
          title: 'inspection',

          fields: [
            defineField({
              name: 'datetime',
              title: 'Inspection Date & Time',
              type: 'datetime',
              validation: (Rule) =>
                Rule.required(),
            }),
            defineField({
              name: 'allocatedAgent',
              title: 'Allocated Agent',
              type: 'reference',
              to: [{ type: 'agent' }],
              options: {
                filter: 'role == "internal"',
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'status',
              title: 'Status',
              type: 'string',
              options: {
                list: [
                  {
                    title: 'Scheduled',
                    value: 'scheduled',
                  },
                  {
                    title: 'Completed',
                    value: 'completed',
                  },
                  {
                    title: 'Cancelled',
                    value: 'cancelled',
                  },
                  {
                    title: 'Rescheduled',
                    value: 'rescheduled',
                  },
                ],
                layout: 'dropdown',
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'interestLevel',
              title: 'Client Interest Level',
              type: 'string',
              hidden: ({
                parent,
              }) => parent?.status !== 'completed',
              options: {
                list: [
                  {
                    title: 'Hot / Ready to Offer',
                    value: 'hot-ready',
                  },
                  {
                    title: 'Warm / Considering',
                    value: 'considering',
                  },
                  {
                    title: 'Cold / Not Interested',
                    value: 'not-interested',
                  }
                ],
                layout: 'dropdown',
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'clientFeedback',
              title: 'Client Feedback',
              type: 'blockContent',
              hidden: ({
                parent,
              }) => parent?.status !== 'completed',
            }),
            defineField({
              name: 'roadblocks',
              title: 'Roadblocks',
              type: 'array',
              of: [defineArrayMember({type: 'string'})],
              hidden: ({
                parent,
              }) => parent?.status !== 'completed',
              options: {
                list: [
                  {title: 'Price', value: 'price'},
                  {title: 'Location', value: 'location'},
                  {title: 'Layout', value: 'layout'},
                  {title: 'Condition', value: 'condition'},
                  {title: 'Financing', value: 'financing'},
                  {title: 'Documentation', value: 'documentation'},
                  {title: 'Client not ready', value: 'client-not-ready'},
                  {title: 'Other', value: 'other'},
                ],
              },
            }),
            defineField({
              name: 'nextStep',
              title: 'Next Step',
              type: 'array',
              of: [defineArrayMember({type: 'string'})],
              options: {
                list: [
                  {title: 'Follow Up', value: 'follow-up'},
                  {title: 'Schedule Another Viewing', value: 'schedule-another-viewing'},
                  {title: 'Prepare Offer', value: 'prepare-offer'},
                  {title: 'Begin Negotiation', value: 'begin-negotiation'},
                  {title: 'Due Diligence', value: 'due-diligence'},
                  {title: 'Awaiting Client', value: 'awaiting-client'},
                  {title: 'Not Interested', value: 'not-interested'},
                  {title: 'Other', value: 'other'},
                ],
              },
            }),
            defineField({
              name: 'note',
              title: 'Note',
              type: 'blockContent',
              hidden: ({
                parent,
              }) => parent?.status !== 'completed',
            }),
          ],

          preview: {
            select: {
              allocatedAgent: 'allocatedAgent.name',
              status: 'status',
              interestLevel: 'interestLevel',
              datetime: 'datetime',
            },

            prepare({
              allocatedAgent,
              status,
              interestLevel,
              datetime,
            }) {
              return {
                title: `
                ${
                  `${allocatedAgent}`
                } • ${
                  datetime
                    ? new Date(
                        datetime,
                      ).toLocaleString()
                    : ''
                }`,

                subtitle: `${status
                } • ${
                  interestLevel
                }`,
              }
            },
          },
        }),
      ],
      fieldset: 'inspection',
    }),

    // ---------------------------------------------------------
    // OFFER HISTORY
    // ---------------------------------------------------------

    defineField({
      name: 'offerHistory',
      title: 'Offer History',
      type: 'array',
      description:
        'All offers remain visible. Offer & Negotiation is the primary stage for working with offers. Existing offer records are never removed or replaced.',
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Offer',

          fields: [
            defineField({
              name: 'madeBy',
              title: 'Made By',
              type: 'string',

              options: {
                list: [
                  {
                    title: 'Client',
                    value: 'client',
                  },
                  {
                    title: 'Developer',
                    value: 'Developer',
                  },
                ],
                layout: 'dropdown',
              },

              validation: (Rule) =>
                Rule.required(),
            }),

            defineField({
              name: 'developerName',
              title: 'Developer Name',
              type: 'string',

              hidden: ({
                parent,
              }) => parent?.madeBy !== 'developer',

              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent =
                    context.parent as {
                      madeBy?: string
                    }

                  if (
                    parent?.madeBy === 'developer' &&
                    !value
                  ) {
                    return 'Developer name is required when an Developer is making an offer.'
                  }

                  return true
                }),
            }),

            defineField({
              name: 'amount',
              title: 'Offer Amount',
              type: 'number',

              validation: (Rule) =>
                Rule.required().min(0),
            }),

            defineField({
              name: 'datetime',
              title: 'Date & Time',
              type: 'datetime',

              validation: (Rule) =>
                Rule.required(),
            }),

            defineField({
              name: 'note',
              title: 'Note',
              type: 'blockContent',
            }),
          ],

          preview: {
            select: {
              madeBy: 'madeBy',
              amount: 'amount',
              datetime: 'datetime',
            },

            prepare({
              madeBy,
              amount,
              datetime,
            }) {
              return {
                title:
                  madeBy === 'client'
                    ? 'Client Offer'
                    : 'Developer Offer',

                subtitle: `${amount ?? 0} • ${
                  datetime
                    ? new Date(
                        datetime,
                      ).toLocaleString()
                    : ''
                }`,
              }
            },
          },
        }),
      ],
      fieldset: 'offers',
    }),

    defineField({
      name: 'agreedPrice',
      title: 'Agreed Price',
      type: 'number',
      readOnly: isDealClosed,
      validation: (Rule) =>
        Rule.min(0),
      fieldset: 'financials',
    }),

    defineField({
      name: 'currency',
      title: 'Currency',
      type: 'string',
      readOnly: isDealClosed,
      options: {
        list: [
          {
            title: 'NGN',
            value: 'NGN',
          },
          {
            title: 'USD',
            value: 'USD',
          },
          {
            title: 'GBP',
            value: 'GBP',
          },
          {
            title: 'EUR',
            value: 'EUR',
          },
          {
            title: 'Other',
            value: 'OTHER',
          },
        ],

        layout: 'dropdown',
      },

      initialValue: 'NGN',

      validation: (Rule) =>
        Rule.required(),
      fieldset: 'financials',
    }),

    // ---------------------------------------------------------
    // BROKERAGE / COMMISSION
    // ---------------------------------------------------------

    defineField({
      name: 'commissionHistory',
      title: 'Payments & Commission',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Payment Arrangement',

          fields: [
            defineField({
              name: 'paymentDirection',
              title: 'Payment Direction',
              type: 'string',
              options: {
                list: [
                  { title: 'Money In', value: 'money-in' },
                  { title: 'Money Out', value: 'money-out' },
                ],
                layout: 'radio',
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'paidBy',
              title: 'Paid By',
              type: 'string',
              hidden: ({ parent }) => parent?.paymentDirection !== 'money-in',
              options: {
                list: [
                  { title: 'External Agent', value: 'external-agent' },
                  { title: 'Referral Partner', value: 'referral-partner' },
                  { title: 'Property Owner / Developer', value: 'developer' },
                  { title: 'Company / Business', value: 'company' },
                  { title: 'Client', value: 'client' },
                  { title: 'Other', value: 'other' },
                ],
                layout: 'dropdown',
              },
              validation: (Rule) => Rule.custom((value, context) => {
                const parent = context.parent as { paymentDirection?: string }
                return parent?.paymentDirection === 'money-in' && !value
                  ? 'Paid By is required for money in.'
                  : true
              }),
            }),
            defineField({
              name: 'paidTo',
              title: 'Paid To',
              type: 'string',
              hidden: ({ parent }) => parent?.paymentDirection !== 'money-out',
              options: {
                list: [
                  { title: 'Internal Agent', value: 'internal-agent' },
                  { title: 'Internal Staff', value: 'internal-staff' },
                  { title: 'External Agent', value: 'external-agent' },
                  { title: 'Referral Partner', value: 'referral-partner' },
                  { title: 'Property Owner / Developer', value: 'developer' },
                  { title: 'Vendor / Service Provider', value: 'vendor' },
                  { title: 'Company / Business', value: 'company' },
                  { title: 'Client', value: 'client' },
                  { title: 'Other', value: 'other' },
                ],
                layout: 'dropdown',
              },
              validation: (Rule) => Rule.custom((value, context) => {
                const parent = context.parent as { paymentDirection?: string }
                return parent?.paymentDirection === 'money-out' && !value
                  ? 'Paid To is required for money out.'
                  : true
              }),
            }),
            defineField({
              name: 'reason',
              title: 'Payment Reason',
              type: 'string',
              options: {
                list: [
                  { title: 'Brokerage Commission', value: 'brokerage-commission' },
                  { title: 'Agency Fee', value: 'agency-fee' },
                  { title: 'Property Marketing Fee', value: 'property-marketing-fee' },
                  { title: 'Service Fee', value: 'service-fee' },
                  { title: 'Referral Fee', value: 'referral-fee' },
                  { title: 'Collaboration Fee', value: 'collaboration-fee' },
                  { title: 'Inspection / Viewing Fee', value: 'inspection-viewing-fee' },
                  { title: 'Management Fee', value: 'management-fee' },
                  { title: 'Internal Commission', value: 'internal-commission' },
                  { title: 'External Agent Commission', value: 'external-agent-commission' },
                  { title: 'Closing Assistance', value: 'closing-assistance' },
                  { title: 'Negotiation Assistance', value: 'negotiation-assistance' },
                  { title: 'Inspection / Viewing Assistance', value: 'inspection-viewing-assistance' },
                  { title: 'Marketing Assistance', value: 'marketing-assistance' },
                  { title: 'Appreciation / Thank You', value: 'appreciation-thank-you' },
                  { title: 'Balance', value: 'balance' },
                  { title: 'Bonus', value: 'bonus' },
                  { title: 'Refund', value: 'refund' },
                  { title: 'Expense', value: 'expense' },
                  { title: 'Other', value: 'other' },
                ],
                layout: 'dropdown',
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'percentage',
              title: 'Percentage (%)',
              type: 'number',
            }),
            defineField({
              name: 'expectedAmount',
              title: 'Expected Amount',
              type: 'number',
              validation: (Rule) => Rule.required().min(0),
            }),
            defineField({
              name: 'amountPaid',
              title: 'Amount Paid',
              type: 'number',
              initialValue: 0,
              readOnly: true,
              components: {
                input: CalculatedAmountPaidInput,
              },
              validation: (Rule) => Rule.required().min(0),
            }),
            defineField({
              name: 'remainingAmount',
              title: 'Remaining Amount',
              type: 'number',
              readOnly: true,
              description: 'Calculated automatically as Expected Amount minus Amount Paid.',
              components: {
                input: CalculatedRemainingAmountInput,
              },
              validation: (Rule) => Rule.min(0),
            }),
            defineField({
              name: 'paymentTransactions',
              title: 'Payment Transactions',
              type: 'array',
              description: 'Add each partial or complete payment here. The Expected Amount above is counted only once.',
              of: [
                defineArrayMember({
                  type: 'object',
                  title: 'Payment Transaction',
                  fields: [
                    defineField({
                      name: 'amount',
                      title: 'Amount Paid',
                      type: 'number',
                      validation: (Rule) => Rule.required().min(0),
                    }),
                    defineField({
                      name: 'paymentDate',
                      title: 'Payment Date',
                      type: 'datetime',
                    }),
                    defineField({
                      name: 'paymentMethod',
                      title: 'Payment Method',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Bank Transfer', value: 'bank-transfer' },
                          { title: 'Cash', value: 'cash' },
                          { title: 'POS', value: 'pos' },
                          { title: 'Cheque', value: 'cheque' },
                          { title: 'Online Payment', value: 'online-payment' },
                          { title: 'Direct Bank Deposit', value: 'direct-bank-deposit' },
                          { title: 'Other', value: 'other' },
                        ],
                        layout: 'dropdown',
                      },
                    }),
                    defineField({
                      name: 'paymentMethodName',
                      title: 'Payment Method Name',
                      type: 'string',
                      hidden: ({ parent }) => parent?.paymentMethod !== 'other',
                    }),
                    defineField({
                      name: 'paymentReference',
                      title: 'Payment Reference',
                      type: 'string',
                    }),
                    defineField({
                      name: 'note',
                      title: 'Note',
                      type: 'text',
                      rows: 3,
                    }),
                  ],
                  preview: {
                    select: {
                      amount: 'amount',
                      paymentDate: 'paymentDate',
                      paymentMethod: 'paymentMethod',
                    },
                    prepare({ amount, paymentDate, paymentMethod }) {
                      return {
                        title: `${amount ?? 0} ${paymentMethod || ''}`,
                        subtitle: paymentDate ? new Date(paymentDate).toLocaleString() : 'Payment date not entered',
                      }
                    },
                  },
                }),
              ],
            }),
            defineField({
              name: 'status',
              title: 'Payment Status',
              type: 'string',
              options: {
                list: [
                  { title: 'Expected', value: 'expected' },
                  { title: 'Pending', value: 'pending' },
                  { title: 'Partially Paid', value: 'partially-paid' },
                  { title: 'Paid', value: 'paid' },
                  { title: 'Cancelled', value: 'cancelled' },
                  { title: 'Refunded', value: 'refunded' },
                ],
                layout: 'dropdown',
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'currency',
              title: 'Currency',
              type: 'string',
              initialValue: 'NGN',
              options: {
                list: [
                  { title: 'NGN - Nigerian Naira', value: 'NGN' },
                  { title: 'USD - US Dollar', value: 'USD' },
                  { title: 'GBP - British Pound', value: 'GBP' },
                  { title: 'EUR - Euro', value: 'EUR' },
                  { title: 'Other', value: 'OTHER' },
                ],
                layout: 'dropdown',
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'currencyName',
              title: 'Currency Name',
              type: 'string',
              hidden: ({ parent }) => parent?.currency !== 'OTHER',
            }),
            defineField({
              name: 'paymentDate',
              title: 'Payment Date',
              type: 'datetime',
            }),
            defineField({
              name: 'paymentMethod',
              title: 'Payment Method',
              type: 'string',
              options: {
                list: [
                  { title: 'Bank Transfer', value: 'bank-transfer' },
                  { title: 'Cash', value: 'cash' },
                  { title: 'POS', value: 'pos' },
                  { title: 'Cheque', value: 'cheque' },
                  { title: 'Online Payment', value: 'online-payment' },
                  { title: 'Direct Bank Deposit', value: 'direct-bank-deposit' },
                  { title: 'Other', value: 'other' },
                ],
                layout: 'dropdown',
              },
            }),
            defineField({
              name: 'paymentMethodName',
              title: 'Payment Method Name',
              type: 'string',
              hidden: ({ parent }) => parent?.paymentMethod !== 'other',
            }),
            defineField({
              name: 'paymentReference',
              title: 'Payment Reference',
              type: 'string',
            }),
            defineField({
              name: 'note',
              title: 'Note',
              type: 'blockContent',
            }),
          ],

          preview: {
            select: {
              direction: 'paymentDirection',
              reason: 'reason',
              expectedAmount: 'expectedAmount',
              amountPaid: 'amountPaid',
              currency: 'currency',
            },

            prepare({ direction, reason, expectedAmount, amountPaid, currency }) {
              return {
                title: `${direction === 'money-out' ? 'Money Out' : 'Money In'}: ${reason || 'Payment'}`,
                subtitle: `${amountPaid ?? 0} / ${expectedAmount ?? 0} ${currency || ''}`,
              }
            },
          },
        }),
      ],
      fieldset: 'financials',
    }),

    defineField({
      name: 'paymentSummary',
      title: 'Automatic Payment Summary',
      type: 'object',
      description: 'Calculated automatically from Payments & Commission.',
      components: {
        input: PaymentSummaryInput,
      },
      fieldset: 'financials',
      fields: [
        defineField({ name: 'totalDue', title: 'Total Due', type: 'number', readOnly: true }),
        defineField({ name: 'totalReceived', title: 'Total Received', type: 'number', readOnly: true }),
        defineField({ name: 'totalStillDue', title: 'Total Still Due', type: 'number', readOnly: true }),
        defineField({ name: 'totalPaidOut', title: 'Total Paid Out', type: 'number', readOnly: true }),
        defineField({ name: 'remaining', title: 'Remaining', type: 'number', readOnly: true }),
      ],
    }),

    // ---------------------------------------------------------
    // SUMMARY / NOTES
    // ---------------------------------------------------------

    defineField({
      name: 'executiveSummary',
      title: 'Executive Summary',
      type: 'blockContent',
      fieldset: 'basicDeal',
    }),

    // ---------------------------------------------------------
    // DEAL ACTIVITIES
    // ---------------------------------------------------------

    defineField({
      name: 'activities',
      title: 'Activity & Follow-Up',
      type: 'array',

      of: [
        defineArrayMember({
          type: 'object',
          title: 'Activity',

          fields: [
            defineField({
              name: 'activityDate',
              title: 'Date & Time',
              type: 'datetime',
              initialValue: () => new Date().toISOString(),
              readOnly: true,
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'actionType',
              title: 'Activity Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Call', value: 'call' },
                  { title: 'WhatsApp', value: 'whatsapp' },
                  { title: 'Email', value: 'email' },
                  { title: 'Meeting', value: 'meeting' },
                  { title: 'Property Viewing', value: 'property-viewing' },
                  { title: 'Offer', value: 'offer' },
                  { title: 'Negotiation', value: 'negotiation' },
                  { title: 'Payment', value: 'payment' },
                  { title: 'Document', value: 'document' },
                  { title: 'Other', value: 'other' },
                ],
                layout: 'dropdown',
              },
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'agent',
              title: 'Agent',
              type: 'reference',
              to: [{ type: 'agent' }],
              options: {
                filter: 'role == "internal"',
              },
              readOnly: true,
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'note',
              title: 'Notes',
              type: 'blockContent',
              validation: (Rule) => Rule.required(),
            }),

            defineField({
              name: 'followUpRequired',
              title: 'Follow-Up Required?',
              type: 'boolean',
              initialValue: false,
            }),

            defineField({
              name: 'nextAction',
              title: 'Next Action',
              type: 'string',
              hidden: ({ parent }) => parent?.followUpRequired !== true,
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent = context.parent as { followUpRequired?: boolean }
                  if (parent?.followUpRequired === true && !value) {
                    return 'Next Action is required when follow-up is required.'
                  }
                  return true
                }),
            }),

            defineField({
              name: 'followUpDateTime',
              title: 'Follow-Up Date & Time',
              type: 'datetime',
              hidden: ({ parent }) => parent?.followUpRequired !== true,
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent = context.parent as { followUpRequired?: boolean }
                  if (parent?.followUpRequired === true && !value) {
                    return 'Follow-Up Date & Time is required when follow-up is required.'
                  }
                  return true
                }),
            }),

            defineField({
              name: 'assignedTo',
              title: 'Assigned To',
              type: 'reference',
              to: [{ type: 'agent' }],
              options: {
                filter: 'role == "internal"',
              },
              hidden: ({ parent }) => parent?.followUpRequired !== true,
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent = context.parent as { followUpRequired?: boolean }
                  if (parent?.followUpRequired === true && !value) {
                    return 'Assigned To is required when follow-up is required.'
                  }
                  return true
                }),
            }),

            defineField({
              name: 'followUpStatus',
              title: 'Follow-Up Status',
              type: 'string',
              hidden: ({ parent }) => parent?.followUpRequired !== true,
              options: {
                list: [
                  { title: 'Pending', value: 'pending' },
                  { title: 'Completed', value: 'completed' },
                  { title: 'Cancelled', value: 'cancelled' },
                ],
                layout: 'dropdown',
              },
              initialValue: 'pending',
              validation: (Rule) =>
                Rule.custom((value, context) => {
                  const parent = context.parent as { followUpRequired?: boolean }
                  if (parent?.followUpRequired === true && !value) {
                    return 'Follow-Up Status is required when follow-up is required.'
                  }
                  return true
                }),
            }),
          ],

          preview: {
            select: {
              actionType: 'actionType',
              activityDate:
                'activityDate',
              agentName:
                'agent.name',
            },

            prepare({
              actionType,
              activityDate,
              agentName,
            }) {
              return {
                title: actionType
                  ? actionType
                      .replace(
                        /-/g,
                        ' ',
                      )
                      .replace(
                        /\b\w/g,
                        (
                          char: string,
                        ) =>
                          char.toUpperCase(),
                      )
                  : 'Activity',

                subtitle: [
                  agentName,
                  activityDate
                    ? new Date(
                        activityDate,
                      ).toLocaleString()
                    : '',
                ]
                  .filter(Boolean)
                  .join(' • '),
              }
            },
          },
        }),
      ],
      fieldset: 'activityFollowUp',
    }),

    // ---------------------------------------------------------
    // DOCUMENT VAULT
    // ---------------------------------------------------------

    defineField({
      name: 'documents',
      title: 'Document Vault',
      type: 'array',
      description:
        'All documents and versions remain visible. Due Diligence is the primary stage for documentation. Existing document records are never removed or replaced.',

      of: [
        defineArrayMember({
          type: 'object',
          title: 'Document',

          fields: [
            defineField({
              name: 'file',
              title: 'File',
              type: 'file',

              validation: (Rule) =>
                Rule.required(),
            }),

            defineField({
              name: 'documentCategory',
              title: 'Document Category',
              type: 'string',

              options: {
                list: [
                  // Rent
                  {
                    title: 'Tenancy Agreement',
                    value:
                      'tenancy-agreement',
                  },
                  {
                    title: 'Guarantor Form',
                    value:
                      'guarantor-form',
                  },
                  {
                    title: 'Utility Bill',
                    value:
                      'utility-bill',
                  },
                  {
                    title: 'Proof of Income',
                    value:
                      'proof-of-income',
                  },
                  {
                    title: 'References',
                    value:
                      'references',
                  },
                  {
                    title: 'Tenant KYC',
                    value:
                      'tenant-kyc',
                  },
                  {
                    title: 'Payment Receipt',
                    value:
                      'payment-receipt',
                  },
                  {
                    title: 'Inventory',
                    value:
                      'inventory',
                  },
                  {
                    title: 'Caution Fee Refund',
                    value:
                      'caution-fee-refund',
                  },

                  // Sale
                  {
                    title: 'Offer Letter',
                    value:
                      'offer-letter',
                  },
                  {
                    title: 'Contract of Sale',
                    value:
                      'contract-of-sale',
                  },
                  {
                    title: 'Deed of Assignment',
                    value:
                      'deed-of-assignment',
                  },
                  {
                    title: 'C of O',
                    value: 'c-of-o',
                  },
                  {
                    title: "Governor's Consent",
                    value:
                      'governors-consent',
                  },
                  {
                    title: 'Survey Plan',
                    value:
                      'survey-plan',
                  },
                  {
                    title: 'Purchase Receipt',
                    value:
                      'purchase-receipt',
                  },
                  {
                    title: 'Excision / Gazette',
                    value:
                      'excision-gazette',
                  },
                  {
                    title: 'Power of Attorney',
                    value:
                      'power-of-attorney',
                  },
                  {
                    title: 'Form 1C',
                    value: 'form-1c',
                  },
                  {
                    title: 'Buyer KYC',
                    value:
                      'buyer-kyc',
                  },

                  // Short-let
                  {
                    title:
                      'Booking Confirmation',
                    value:
                      'booking-confirmation',
                  },
                  {
                    title: 'Guest ID/KYC',
                    value:
                      'guest-id-kyc',
                  },
                  {
                    title:
                      'Check-in Record',
                    value:
                      'check-in-record',
                  },
                  {
                    title:
                      'Check-out Record',
                    value:
                      'check-out-record',
                  },
                  {
                    title: 'Damage Report',
                    value:
                      'damage-report',
                  },
                  {
                    title: 'Refund Record',
                    value:
                      'refund-record',
                  },

                  // Shared
                  {
                    title: 'Other',
                    value: 'other',
                  },
                ],

                layout: 'dropdown',
              },

              validation: (Rule) =>
                Rule.required().custom(
                  (
                    value,
                    context,
                  ) => {
                    const dealType =
                      (
                        context.document as {
                          dealType?: string
                        }
                      )?.dealType

                    if (
                      !value ||
                      !dealType
                    ) {
                      return true
                    }

                    const rentCategories =
                      [
                        'tenancy-agreement',
                        'guarantor-form',
                        'utility-bill',
                        'proof-of-income',
                        'references',
                        'tenant-kyc',
                        'payment-receipt',
                        'inventory',
                        'caution-fee-refund',
                        'other',
                      ]

                    const saleCategories =
                      [
                        'offer-letter',
                        'contract-of-sale',
                        'deed-of-assignment',
                        'c-of-o',
                        'governors-consent',
                        'survey-plan',
                        'purchase-receipt',
                        'excision-gazette',
                        'power-of-attorney',
                        'form-1c',
                        'buyer-kyc',
                        'other',
                      ]

                    const shortLetCategories =
                      [
                        'booking-confirmation',
                        'guest-id-kyc',
                        'payment-receipt',
                        'inventory',
                        'check-in-record',
                        'check-out-record',
                        'damage-report',
                        'refund-record',
                        'other',
                      ]

                    const validCategories =
                      dealType ===
                      'rent'
                        ? rentCategories
                        : dealType ===
                            'sale'
                          ? saleCategories
                          : shortLetCategories

                    return validCategories.includes(
                      value,
                    )
                      ? true
                      : `This document category is not valid for ${dealType}.`
                  },
                ),
            }),

            defineField({
              name: 'documentName',
              title: 'Document Name',
              type: 'string',

              description:
                'Automatically populated from the selected Document Category.',

              readOnly: true,

              components: {
                input: AutoDocumentNameInput,
              },

              validation: (Rule) =>
                Rule.required(),
            }),

            defineField({
              name: 'documentVersion',
              title: 'Document Version',
              type: 'string',

              options: {
                list: [
                  {
                    title: 'Version 1',
                    value: 'version-1',
                  },
                  {
                    title: 'Version 2',
                    value: 'version-2',
                  },
                  {
                    title: 'Version 3',
                    value: 'version-3',
                  },
                  {
                    title: 'Version 4',
                    value: 'version-4',
                  },
                  {
                    title: 'Version 5',
                    value: 'version-5',
                  },
                  {
                    title: 'Final',
                    value: 'final',
                  },
                ],

                layout: 'dropdown',
              },

              validation: (Rule) =>
                Rule.required(),
            }),

            defineField({
              name: 'uploadedBy',
              title: 'Uploaded By',
              type: 'reference',
              options: {
                filter: 'role == "internal"',
              },
              to: [
                {
                  type: 'agent',
                },
              ],
            }),

            defineField({
              name: 'uploadedAt',
              title: 'Uploaded At',
              type: 'datetime',

              initialValue: () =>
                new Date().toISOString(),
            }),

            defineField({
              name: 'notes',
              title: 'Notes',
              type: 'blockContent',
            }),
          ],

          preview: {
            select: {
              title: 'documentName',
              version:
                'documentVersion',
              category:
                'documentCategory',
              uploadedAt:
                'uploadedAt',
            },

            prepare({
              title,
              version,
              category,
              uploadedAt,
            }) {
              return {
                title:
                  title ||
                  'Unnamed Document',

                subtitle: [
                  category,
                  version,
                  uploadedAt
                    ? new Date(
                        uploadedAt,
                      ).toLocaleDateString()
                    : '',
                ]
                  .filter(Boolean)
                  .join(' • '),
              }
            },
          },
        }),
      ],
      fieldset: 'documents',
    }),

    // ---------------------------------------------------------
    // APPLICATION MANAGED DATES
    // ---------------------------------------------------------

    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
      fieldset: 'history',
    }),

    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      readOnly: true,
      fieldset: 'history',
    }),

    defineField({
      name: 'closedAt',
      title: 'Closed At',
      type: 'datetime',
      readOnly: true,

      hidden: ({
        document,
      }) =>
        document?.dealStage !==
          'closed-won' &&
        document?.dealStage !==
          'closed-lost',
      fieldset: 'history',
    }),
  ],

  // System dates are intentionally read-only.
  // Maintain these values in the application/backend:
  // - createdAt: set when the deal is created
  // - updatedAt: update whenever the deal changes
  // - closedAt: set when the deal first becomes closed-won or closed-lost
  //
  // ---------------------------------------------------------
  // DEAL PREVIEW
  // ---------------------------------------------------------

  preview: {
    select: {
      client: 'client.fullName',
      property: 'property.title',
      dealCode: 'dealCode',
      dealType: 'dealType',
      dealStage: 'dealStage',
      assignedAgent:
        'assignedInternalAgent.name',
    },

    prepare({
      client,
      property,
      dealCode,
      dealType,
      dealStage,
      assignedAgent,
    }) {
      return {
        title: `${dealCode} — ${client} — ${property}`,

        subtitle: [
          dealType,
          dealStage,
          assignedAgent,
        ]
          .filter(Boolean)
          .join(' • '),
      }
    },
  },

  // ---------------------------------------------------------
  // ORDERINGS
  // ---------------------------------------------------------

  orderings: [
    {
      title: 'Newest First',
      name: 'createdAtDesc',
      by: [
        {
          field: 'createdAt',
          direction: 'desc',
        },
      ],
    },

    {
      title: 'Recently Updated',
      name: 'updatedAtDesc',
      by: [
        {
          field: 'updatedAt',
          direction: 'desc',
        },
      ],
    },

    {
      title: 'Deal Stage',
      name: 'dealStageAsc',
      by: [
        {
          field: 'dealStage',
          direction: 'asc',
        },
      ],
    },
  ],
})