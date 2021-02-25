import React from 'react'
import PageContainer from '../components/PageContainer'
import Header from '../components/Header'
import {
  Stack,
  Box,
  Flex,
  Heading,
  Button,
  Text,
  SimpleGrid,
} from '@chakra-ui/react'
import { formatCurrency } from '../utils/format'
import { Formik, Form } from 'formik'
import {
  validateAge,
  validateRetirementAge,
  validateMonthlyRetirement,
  validateReturnOnInvestmentDuringRetirement,
  validateReturnOnInvestmentDuringSaving,
  validateLifeExpectancy,
  validateCurrentSavings,
  combineValidators,
} from '../services/validation'
import { track } from '../utils/analytics'
import AgeInput from './planPreview/AgeInput'
import RetirementAgeInput from './planPreview/RetirementAgeInput'
import LifeExpectancyInput from './planPreview/LifeExpectancyInput'
import MonthlyRetirementInput from './planPreview/MonthlyRetirementInput'
import ReturnOnInvestmentDuringSavingInput from './planPreview/ReturnOnInvestmentDuringSavingInput'
import ReturnOnInvestmentDuringRetirementInput from './planPreview/ReturnOnInvestmentDuringRetirementInput'
import CurrentSavingsInput from './planPreview/CurrentSavingsInput'
import PlanChart from './planPreview/PlanChart'

const validate = combineValidators([
  { name: 'age', validation: validateAge },
  { name: 'retirementAge', validation: validateRetirementAge },
  { name: 'lifeExpectancy', validation: validateLifeExpectancy },
  { name: 'monthlyRetirement', validation: validateMonthlyRetirement },
  {
    name: 'returnOnInvestmentDuringSaving',
    validation: validateReturnOnInvestmentDuringSaving,
  },
  {
    name: 'returnOnInvestmentDuringRetirement',
    validation: validateReturnOnInvestmentDuringRetirement,
  },
  { name: 'currentSavings', validation: validateCurrentSavings },
])

const hideForPrint = {
  sx: {
    '@media print': {
      display: 'none',
    },
  },
}

const PlanPreview: React.FC<{
  plan: RetirementPlanValues
  resetPlan: Function
  values: PlanFormValues
  setValues: Function
}> = ({ plan, resetPlan, values, setValues }) => {
  return (
    <>
      <Header />
      <PageContainer>
        <Stack
          direction={{ md: 'row', base: 'column' }}
          alignItems={{ md: 'center', base: 'flex-start' }}
          spacing={8}
          pt={16}
          pb={16}
        >
          <Box flex="1">
            <Heading fontSize="4xl" mb={4}>
              Strategia
            </Heading>
            <Text fontSize="xl">
              W oparciu o twoje odpowiedzi wygenerowaliśmy strategię
              oszczędnościową dla twojej osobistej emerytury.
            </Text>
          </Box>
          <Flex flex="1" justifyContent="flex-end" {...hideForPrint}>
            <Button
              size="lg"
              mr={2}
              onClick={() => {
                window.print()
                track({
                  category: 'Plan',
                  action: 'Export',
                })
              }}
            >
              Eksportuj
            </Button>
            <Button
              size="lg"
              variant="ghost"
              onClick={() => {
                resetPlan()
                track({
                  category: 'Plan',
                  action: 'Reset',
                })
              }}
            >
              Resetuj
            </Button>
          </Flex>
        </Stack>
        <Stack
          direction={{ lg: 'row', base: 'column' }}
          mb={16}
          alignItems={{ base: 'stretch', lg: 'flex-start' }}
          spacing={12}
        >
          <Box
            flex="1"
            borderWidth="1px"
            borderRadius="lg"
            py={8}
            px={8}
            flexShrink={0}
          >
            <Heading fontSize="2xl" mb={4}>
              Ustawienia strategii
            </Heading>
            <Formik<PlanFormValues>
              initialValues={values}
              validateOnChange={false}
              validate={(values) => {
                const errors = validate(values)
                if (Object.keys(errors).length === 0) {
                  setValues(values)
                }
                return errors
              }}
              onSubmit={() => {}}
            >
              {() => (
                <Form>
                  <SimpleGrid spacing={4} columns={{ base: 1, md: 2, lg: 1 }}>
                    <AgeInput />
                    <RetirementAgeInput />
                    <LifeExpectancyInput />
                    <MonthlyRetirementInput />
                    <ReturnOnInvestmentDuringSavingInput />
                    <ReturnOnInvestmentDuringRetirementInput />
                    <CurrentSavingsInput />
                  </SimpleGrid>
                </Form>
              )}
            </Formik>
          </Box>
          <Box flex="2" py={8}>
            <Stack
              mb={16}
              spacing={8}
              direction={{ md: 'row', base: 'column' }}
            >
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
          </Box>
        </Stack>
      </PageContainer>
    </>
  )
}

export default PlanPreview
