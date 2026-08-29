import {
  useClient,
  useFormValue,
  type InputProps,
} from 'sanity'

import {
  Card,
  Flex,
  Label,
  Spinner,
  Text,
} from '@sanity/ui'

import { set, unset, PatchEvent } from 'sanity'
import { useEffect, useState } from 'react'

type PropertyReference = {
  _ref?: string
  _type?: string
}

export default function AutoAskingPriceInput(props: InputProps) {
  const { value, onChange, elementProps } = props

  const client = useClient({
    apiVersion: '2025-01-01',
  })

  const property = useFormValue([
    'property',
  ]) as PropertyReference | undefined

  const [loading, setLoading] = useState(false)
  const [propertyTitle, setPropertyTitle] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const populateAskingPrice = async () => {
      const propertyId = property?._ref

      if (!propertyId) {
        setPropertyTitle(null)

        // Clear asking price if property is removed.
        if (value !== undefined && value !== null) {
          onChange(PatchEvent.from(unset()))
        }

        return
      }

      setLoading(true)

      try {
        const listing = await client.fetch<{
          price?: number
          title?: string
        } | null>(
          `*[_id == $propertyId][0]{
            price,
            title
          }`,
          {
            propertyId,
          },
        )

        if (cancelled) return

        setPropertyTitle(listing?.title ?? null)

        const price = listing?.price

        if (typeof price === 'number') {
          if (value !== price) {
            onChange(PatchEvent.from(set(price)))
          }
        } else if (value !== undefined && value !== null) {
          onChange(PatchEvent.from(unset()))
        }
      } catch (error) {
        console.error(
          'Failed to fetch property price:',
          error,
        )
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    populateAskingPrice()

    return () => {
      cancelled = true
    }
  }, [
    client,
    property?._ref,
  ])

  const formattedValue =
    typeof value === 'number'
      ? new Intl.NumberFormat('en-NG', {
          style: 'currency',
          currency: 'NGN',
          maximumFractionDigits: 0,
        }).format(value)
      : 'Not available'

  return (
    <Card padding={3} border radius={2}>
      <Flex direction="column" gap={3}>
        <Label size={1}>
          Asking Price
        </Label>

        {loading ? (
          <Flex align="center" gap={2}>
            <Spinner muted />
            <Text muted size={1}>
              Loading property price...
            </Text>
          </Flex>
        ) : (
          <Text size={2} weight="semibold">
            {formattedValue}
          </Text>
        )}

        {propertyTitle && (
          <Text size={1} muted>
            Automatically populated from: {propertyTitle}
          </Text>
        )}

        <input
          {...elementProps}
          type="hidden"
          value={typeof value === 'number' ? value : ''}
          readOnly
        />
      </Flex>
    </Card>
  )
}