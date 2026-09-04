import {type InputProps, useFormValue} from 'sanity'
import {Card, Flex, Label, Text} from '@sanity/ui'

type Payment = {
  paymentDirection?: 'money-in' | 'money-out'
  expectedAmount?: number
  amountPaid?: number
  paymentTransactions?: {amount?: number}[]
}

export default function PaymentSummaryInput(props: InputProps) {
  
  const payments = useFormValue(['commissionHistory']) as Payment[] | undefined
  const summary = (payments ?? []).reduce(
    (totals, payment) => {
      const expected = typeof payment.expectedAmount === 'number' ? payment.expectedAmount : 0
      const transactionTotal = (payment.paymentTransactions ?? []).reduce(
        (total, transaction) => total + (typeof transaction.amount === 'number' ? transaction.amount : 0),
        0,
      )
      const paid = payment.paymentTransactions?.length
        ? transactionTotal
        : typeof payment.amountPaid === 'number'
          ? payment.amountPaid
          : 0

      if (payment.paymentDirection === 'money-out') {
        totals.totalPaidOut += paid
      } else {
        totals.totalDue += expected
        totals.totalReceived += paid
        totals.totalStillDue += Math.max(0, expected - paid)
      }

      return totals
    },
    {totalDue: 0, totalReceived: 0, totalStillDue: 0, totalPaidOut: 0},
  )
  const calculatedSummary = {...summary, remaining: summary.totalReceived - summary.totalPaidOut}

  const rows = [
    ['Total Due', summary.totalDue],
    ['Total Received', summary.totalReceived],
    ['Total Still Due', summary.totalStillDue],
    ['Total Paid Out', summary.totalPaidOut],
    ['Remaining', calculatedSummary.remaining],
  ] as const

  return (
    <Card padding={3} border radius={2}>
      <Flex direction="column" gap={2}>
        <Label size={1}>Automatic Payment Summary</Label>
        {rows.map(([label, amount]) => (
          <Flex key={label} justify="space-between" gap={3}>
            <Text size={1}>{label}</Text>
            <Text size={1} weight="semibold">{amount.toLocaleString()}</Text>
          </Flex>
        ))}
      </Flex>
    </Card>
  )
}
