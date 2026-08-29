import {
  useFormValue,
  type InputProps,
  set,
  unset,
  PatchEvent,
} from 'sanity'

import {
  Card,
  Flex,
  Label,
  Text,
} from '@sanity/ui'
import { useEffect } from 'react'

const DOCUMENT_CATEGORY_LABELS: Record<string, string> = {
  // Rent
  'tenancy-agreement': 'Tenancy Agreement',
  'guarantor-form': 'Guarantor Form',
  'utility-bill': 'Utility Bill',
  'proof-of-income': 'Proof of Income',
  references: 'References',
  'tenant-kyc': 'Tenant KYC',
  'payment-receipt': 'Payment Receipt',
  inventory: 'Inventory',
  'caution-fee-refund': 'Caution Fee Refund',

  // Sale
  'offer-letter': 'Offer Letter',
  'contract-of-sale': 'Contract of Sale',
  'deed-of-assignment': 'Deed of Assignment',
  'c-of-o': 'C of O',
  'governors-consent': "Governor's Consent",
  'survey-plan': 'Survey Plan',
  'purchase-receipt': 'Purchase Receipt',
  'excision-gazette': 'Excision / Gazette',
  'power-of-attorney': 'Power of Attorney',
  'form-1c': 'Form 1C',
  'buyer-kyc': 'Buyer KYC',

  // Short-let
  'booking-confirmation': 'Booking Confirmation',
  'guest-id-kyc': 'Guest ID/KYC',
  'check-in-record': 'Check-in Record',
  'check-out-record': 'Check-out Record',
  'damage-report': 'Damage Report',
  'refund-record': 'Refund Record',

  // Shared
  other: 'Other',
}

export default function AutoDocumentNameInput(
  props: InputProps,
) {
  const {
    value,
    onChange,
    path,
  } = props

  /**
   * documentName is located at:
   *
   * documents[]._key.documentName
   *
   * So the parent path is:
   *
   * documents[]._key
   *
   * We can then read:
   *
   * documents[]._key.documentCategory
   */
  const documentCategoryPath = [
    ...path.slice(0, -1),
    'documentCategory',
  ]

  const documentCategory = useFormValue(
    documentCategoryPath,
  ) as string | undefined

  const documentName =
    typeof documentCategory === 'string'
      ? DOCUMENT_CATEGORY_LABELS[documentCategory]
      : undefined

  useEffect(() => {
    if (!documentCategory) {
      if (value !== undefined && value !== null) {
        onChange(PatchEvent.from(unset()))
      }

      return
    }

    if (!documentName) {
      if (value !== undefined && value !== null) {
        onChange(PatchEvent.from(unset()))
      }

      return
    }

    if (value !== documentName) {
      onChange(
        PatchEvent.from(
          set(documentName),
        ),
      )
    }
  }, [
    documentCategory,
    documentName,
  ])

  return (
    <Card padding={3} border radius={2}>
      <Flex direction="column" gap={3}>
        <Label size={1}>
          Document Name
        </Label>

        <Text
          size={2}
          weight="semibold"
        >
          {documentName || 'Select a document category'}
        </Text>

        {documentName && (
          <Text size={1} muted>
            Automatically populated from Document Category
          </Text>
        )}
      </Flex>
    </Card>
  )
}