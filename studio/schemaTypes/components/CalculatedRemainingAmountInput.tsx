import {type InputProps, useFormValue} from 'sanity'
import {Card, Flex, Label, Text} from '@sanity/ui'

type PaymentValue = {
  expectedAmount?: number
  amountPaid?: number
  paymentTransactions?: {amount?: number}[]
}

export default function CalculatedRemainingAmountInput(props: InputProps) {
  const {path} = props
  const payment = useFormValue([
    ...path.slice(0, -1),
  ]) as PaymentValue | undefined

  const expectedAmount = typeof payment?.expectedAmount === 'number' ? payment.expectedAmount : 0
  const transactionTotal = (payment?.paymentTransactions ?? []).reduce(
    (total, transaction) => total + (typeof transaction.amount === 'number' ? transaction.amount : 0),
    0,
  )
  const amountPaid = payment?.paymentTransactions?.length
    ? transactionTotal
    : typeof payment?.amountPaid === 'number'
      ? payment.amountPaid
      : 0
  const remainingAmount = Math.max(0, expectedAmount - amountPaid)

  return (
    <Card padding={3} border radius={2}>
      <Flex direction="column" gap={2}>
        <Label size={1}>Remaining Amount</Label>
        <Text size={2} weight="semibold">
          {remainingAmount.toLocaleString()}
        </Text>
      </Flex>
    </Card>
  )
}
