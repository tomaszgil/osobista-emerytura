import React from 'react'
import { useTheme } from '@chakra-ui/react'
import { formatCurrency } from '../../utils/format'
import {
  BarChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Bar,
  ResponsiveContainer,
} from 'recharts'

const seriesToLabel: { [key: string]: string } = {
  equity: 'Kapitał',
  interest: 'Odsetki',
}

function tickFormatter(value: number): string {
  if (value > 10 ** 6) {
    return `${value / 10 ** 6} mln`
  }

  if (value > 10 ** 3) {
    return `${value / 10 ** 3} tys`
  }

  return String(value)
}

const PlanChart: React.FC<{ data: RetirementPlanValues['series'] }> = ({
  data,
}) => {
  const theme = useTheme()

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data}>
        <CartesianGrid vertical={false} />
        <XAxis axisLine={false} tickLine={false} dataKey="year" />
        <YAxis
          axisLine={false}
          tickLine={false}
          tickFormatter={tickFormatter}
        />
        <Tooltip
          formatter={(value: number, label: string) => [
            formatCurrency(value),
            seriesToLabel[label],
          ]}
        />
        <Bar dataKey="equity" stackId="x" fill={theme.colors.brand[700]} />
        <Bar dataKey="interest" stackId="x" fill={theme.colors.brand[600]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default PlanChart
