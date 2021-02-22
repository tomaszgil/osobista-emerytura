import * as React from 'react'
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
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  FormLabel,
  FormErrorMessage,
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
import {
  Formik,
  Field,
  Form,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  FieldInputProps,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  FormikProps,
} from 'formik'
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
  const theme = useTheme()

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
                    <Field name="age" type="number">
                      {({
                        field,
                        form,
                      }: {
                        field: FieldInputProps<''>
                        form: FormikProps<PlanFormValues>
                      }) => (
                        <FormControl
                          isInvalid={!!(form.errors.age && form.touched.age)}
                        >
                          <FormLabel>Wiek</FormLabel>
                          <Input {...field} placeholder="Wiek" />
                          <FormErrorMessage>{form.errors.age}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="retirementAge" type="number">
                      {({
                        field,
                        form,
                      }: {
                        field: FieldInputProps<''>
                        form: FormikProps<PlanFormValues>
                      }) => (
                        <FormControl
                          isInvalid={
                            !!(
                              form.errors.retirementAge &&
                              form.touched.retirementAge
                            )
                          }
                        >
                          <FormLabel>Wiek emerytalny</FormLabel>
                          <Input {...field} placeholder="Wiek emerytalny" />
                          <FormErrorMessage>
                            {form.errors.retirementAge}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="lifeExpectancy" type="number">
                      {({
                        field,
                        form,
                      }: {
                        field: FieldInputProps<''>
                        form: FormikProps<PlanFormValues>
                      }) => (
                        <FormControl
                          isInvalid={
                            !!(
                              form.errors.lifeExpectancy &&
                              form.touched.lifeExpectancy
                            )
                          }
                        >
                          <FormLabel>Oczekiwana długość życia</FormLabel>
                          <Input
                            {...field}
                            placeholder="Oczekiwana długość życia"
                          />
                          <FormErrorMessage>
                            {form.errors.lifeExpectancy}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="monthlyRetirement" type="number">
                      {({
                        field,
                        form,
                      }: {
                        field: FieldInputProps<''>
                        form: FormikProps<PlanFormValues>
                      }) => (
                        <FormControl
                          isInvalid={
                            !!(
                              form.errors.monthlyRetirement &&
                              form.touched.monthlyRetirement
                            )
                          }
                        >
                          <FormLabel>Wysokość miesięcznej emerytury</FormLabel>
                          <InputGroup>
                            <Input
                              {...field}
                              placeholder="Wysokość miesięcznej emerytury"
                            />
                            <InputRightElement color="gray.400" children="zł" />
                          </InputGroup>
                          <FormErrorMessage>
                            {form.errors.monthlyRetirement}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="returnOnInvestmentDuringSaving" type="number">
                      {({
                        field,
                        form,
                      }: {
                        field: FieldInputProps<''>
                        form: FormikProps<PlanFormValues>
                      }) => (
                        <FormControl
                          isInvalid={
                            !!(
                              form.errors.returnOnInvestmentDuringSaving &&
                              form.touched.returnOnInvestmentDuringSaving
                            )
                          }
                        >
                          <FormLabel>
                            Zwrot z inwestycji (w czasie oszczędzania)
                          </FormLabel>
                          <InputGroup>
                            <Input
                              {...field}
                              placeholder="Zwrot z inwestycji"
                            />
                            <InputRightElement color="gray.400" children="%" />
                          </InputGroup>
                          <FormErrorMessage>
                            {form.errors.returnOnInvestmentDuringSaving}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field
                      name="returnOnInvestmentDuringRetirement"
                      type="number"
                    >
                      {({
                        field,
                        form,
                      }: {
                        field: FieldInputProps<''>
                        form: FormikProps<PlanFormValues>
                      }) => (
                        <FormControl
                          isInvalid={
                            !!(
                              form.errors.returnOnInvestmentDuringRetirement &&
                              form.touched.returnOnInvestmentDuringRetirement
                            )
                          }
                        >
                          <FormLabel>
                            Zwrot z inwestycji (w czasie emerytury)
                          </FormLabel>
                          <InputGroup>
                            <Input
                              {...field}
                              placeholder="Zwrot z inwestycji"
                            />
                            <InputRightElement color="gray.400" children="%" />
                          </InputGroup>
                          <FormErrorMessage>
                            {form.errors.returnOnInvestmentDuringRetirement}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Field name="currentSavings" type="number">
                      {({
                        field,
                        form,
                      }: {
                        field: FieldInputProps<''>
                        form: FormikProps<PlanFormValues>
                      }) => (
                        <FormControl
                          isInvalid={
                            !!(
                              form.errors.currentSavings &&
                              form.touched.currentSavings
                            )
                          }
                        >
                          <FormLabel>Aktualne oszczędności</FormLabel>
                          <InputGroup>
                            <Input
                              {...field}
                              placeholder="Aktualne oszczędności"
                            />
                            <InputRightElement color="gray.400" children="zł" />
                          </InputGroup>
                          <FormErrorMessage>
                            {form.errors.currentSavings}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
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
            <Box>
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
        </Stack>
      </PageContainer>
    </>
  )
}

export default PlanPreview
