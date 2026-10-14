import React from 'react'
import {Card, Stack, Text, Flex, Box} from '@sanity/ui'
import {ObjectInputProps, useFormValue} from 'sanity'

/**
 * Convert a number into English words.
 *
 * Examples:
 * 1000        -> One Thousand Naira
 * 250000      -> Two Hundred and Fifty Thousand Naira
 * 1000000     -> One Million Naira
 * 250000000   -> Two Hundred and Fifty Million Naira
 */
const numberToWords = (value: number): string => {
  if (!Number.isFinite(value) || value < 0) {
    return ''
  }

  if (value === 0) {
    return 'Zero Naira'
  }

  const ones = [
    '',
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
    'Ten',
    'Eleven',
    'Twelve',
    'Thirteen',
    'Fourteen',
    'Fifteen',
    'Sixteen',
    'Seventeen',
    'Eighteen',
    'Nineteen',
  ]

  const tens = [
    '',
    '',
    'Twenty',
    'Thirty',
    'Forty',
    'Fifty',
    'Sixty',
    'Seventy',
    'Eighty',
    'Ninety',
  ]

  const convertHundreds = (num: number): string => {
    let result = ''

    if (num >= 100) {
      result += `${ones[Math.floor(num / 100)]} Hundred`
      num %= 100

      if (num > 0) {
        result += ' and '
      }
    }

    if (num >= 20) {
      result += tens[Math.floor(num / 10)]
      num %= 10

      if (num > 0) {
        result += `-${ones[num]}`
      }
    } else if (num > 0) {
      result += ones[num]
    }

    return result
  }

  const scales = [
    {value: 1_000_000_000, name: 'Billion'},
    {value: 1_000_000, name: 'Million'},
    {value: 1_000, name: 'Thousand'},
    {value: 1, name: ''},
  ]

  let remaining = Math.floor(value)
  const parts: string[] = []

  for (const scale of scales) {
    if (remaining >= scale.value) {
      const count = Math.floor(remaining / scale.value)
      remaining %= scale.value

      const words = convertHundreds(count)

      if (scale.name) {
        parts.push(`${words} ${scale.name}`)
      } else {
        parts.push(words)
      }
    }
  }

  return `${parts.join(' ')} Naira`
}

export default function PriceInWordsInput(
  props: ObjectInputProps
) {
  /**
   * Read the sibling `price` field from the current document.
   *
   * Because this component is used inside the listing document,
   * `useFormValue(['price'])` gives us the current price value.
   */
  const price = useFormValue(['price']) as number | undefined

  const priceInWords =
    typeof price === 'number'
      ? numberToWords(price)
      : 'Enter a price above'

  return (
    <Stack gap={3}>
      <Text size={1} weight="semibold">
        Price in Words
      </Text>

      <Card
        padding={3}
        radius={2}
        tone={price ? 'positive' : 'default'}
        border
      >
        <Flex align="center">
          <Box flex={1}>
            <Text
              size={2}
              weight="medium"
              muted={!price}
            >
              {priceInWords}
            </Text>
          </Box>
        </Flex>
      </Card>

      {price ? (
        <Text size={1} muted>
          Automatically generated from the Price field.
        </Text>
      ) : (
        <Text size={1} muted>
          Enter a price to generate the amount in words.
        </Text>
      )}
    </Stack>
  )
}