import {type InputProps, useFormValue} from 'sanity'
import {Card, Flex, Label, Text} from '@sanity/ui'

type PaymentValue = {
  amountPaid?: number
  paymentTransactions?: {amount?: number}[]
}

export default function CalculatedAmountPaidInput(props: InputProps) {
  const {path} = props
  const payment = useFormValue([...path.slice(0, -1)]) as PaymentValue | undefined
  const transactions = payment?.paymentTransactions ?? []
  const amountPaid = transactions.length
    ? transactions.reduce((total, transaction) => total + (transaction.amount ?? 0), 0)
    : typeof payment?.amountPaid === 'number'
      ? payment.amountPaid
      : 0

  return (
    <Card padding={3} border radius={2}>
      <Flex direction="column" gap={2}>
        <Label size={1}>Amount Paid</Label>
        <Text size={2} weight="semibold">{amountPaid.toLocaleString()}</Text>
        <Text size={1} muted>
          {transactions.length ? 'Calculated from Payment Transactions.' : 'Add transactions for partial payments.'}
        </Text>
      </Flex>
    </Card>
  )
}
