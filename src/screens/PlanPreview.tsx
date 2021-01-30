import * as React from 'react'
import PageContainer from '../components/PageContainer'
import Header from '../components/Header'
import {
  HStack,
  Box,
  Flex,
  Heading,
  Button,
  Text,
  useTheme,
} from '@chakra-ui/react'
import { formatCurrency } from '../utils/format'
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

const PlanPreview: React.FC<{
  plan: RetirementPlanValues
  resetPlan: React.MouseEventHandler<HTMLElement>
}> = ({ plan, resetPlan }) => {
  const theme = useTheme()

  return (
    <>
      <Header />
      <PageContainer>
        <HStack spacing={8} pt={16} pb={16}>
          <Box flex="1">
            <Heading fontSize="4xl" mb={4}>
              Strategia
            </Heading>
            <Text fontSize="xl">
              W oparciu o twoje odpowiedzi wygenerowaliśmy strategię
              oszczędnościową dla twojej osobistej emerytury.
            </Text>
          </Box>
          <Flex flex="1" justifyContent="flex-end">
            <Button size="lg" mr={2} onClick={window.print}>
              Eksportuj
            </Button>
            <Button size="lg" variant="ghost" onClick={resetPlan}>
              Resetuj
            </Button>
          </Flex>
        </HStack>
        <HStack alignItems="flex-start" spacing={8}>
          <Box flex="1" borderWidth="1px" borderRadius="lg" py={8} px={8}>
            <Heading fontSize="2xl">Ustawienia strategii</Heading>
          </Box>
          <Box flex="2" py={8}>
            <Flex mb={16}>
              <Box flex="1">
                <Text fontSize="2xl" color="brand.900" fontWeight="bold" mb={2}>
                  Wysokość miesięcznych oszczędności
                </Text>
                <Text fontSize="4xl" color="brand.700" fontWeight="bold">
                  {formatCurrency(plan.payment)}
                </Text>
              </Box>
              <Box flex="1">
                <Text fontSize="2xl" color="brand.900" fontWeight="bold" mb={2}>
                  Oszczędności w chwili przejścia na emeryturę
                </Text>
                <Text fontSize="4xl" color="brand.700" fontWeight="bold">
                  {formatCurrency(plan.totalSavings)}
                </Text>
              </Box>
            </Flex>
            <Box mb={16}>
              <Heading fontSize="2xl" mb={8}>
                Kapitał
              </Heading>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={plan.series}>
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
                  <Bar
                    dataKey="equity"
                    stackId="x"
                    fill={theme.colors.brand[700]}
                  />
                  <Bar
                    dataKey="interest"
                    stackId="x"
                    fill={theme.colors.brand[600]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        </HStack>
      </PageContainer>
    </>
  )
}

export default PlanPreview
