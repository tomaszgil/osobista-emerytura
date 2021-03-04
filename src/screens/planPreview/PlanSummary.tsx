import React from 'react'
import { Stack, Box, Heading, Text } from '@chakra-ui/react'
import { formatCurrency } from '../../utils/format'
import PlanChart from './PlanChart'

const PlanSummary: React.FC<{
  plan: RetirementPlanValues
}> = ({ plan }) => {
  return (
    <>
      <Stack mb={12} spacing={8} direction={{ md: 'row', base: 'column' }}>
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
      </Stack>
      <Box sx={{ overflow: 'hidden' }}>
        <Heading fontSize="2xl" mb={8}>
          Kapitał
        </Heading>
        <PlanChart data={plan.series} />
      </Box>
    </>
  )
}

export default PlanSummary
