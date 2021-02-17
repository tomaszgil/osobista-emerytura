import * as React from 'react'
import PageContainer from '../components/PageContainer'
import Header from '../components/Header'
import {
  HStack,
  Stack,
  Box,
  Heading,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  FormControl,
  Center,
  FormErrorMessage,
  useRadioGroup,
  useBreakpointValue,
} from '@chakra-ui/react'
import {
  Formik,
  Field,
  Form,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  FieldInputProps,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  FormikProps,
  useFormikContext,
} from 'formik'
import FormStep from '../components/FormStep'
import RadioTile from '../components/RadioTile'
import FormStepButton from '../components/FormStepButton'
import PageBackground from '../components/PageBackground'
import bank from '../assets/bank.svg'
import news from '../assets/news.svg'
import stock from '../assets/stock.svg'
import {
  validateAge,
  validateRetirementAge,
  validateMonthlyRetirement,
  createStepValidator,
} from '../utils/validation'
import useFocusOnShow from '../utils/useFocusOnShow'

const AgeStep: React.FC<{ title: string }> = ({ title }) => {
  const inputRef = useFocusOnShow()

  return (
    <FormStep
      title={title}
      description="Potrzebujemy tej informacji, żeby obliczyć ile lat będziesz odkładać na emeryturę. Zakładamy, że zaczynasz odkładać już teraz. Wszystkie dane będziesz mógł dostosować później."
    >
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
            maxWidth="sm"
          >
            <Input {...field} ref={inputRef} size="lg" placeholder="Wiek" />
            <FormErrorMessage>{form.errors.age}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
    </FormStep>
  )
}

const RetirementAgeStep: React.FC<{ title: string }> = ({ title }) => {
  const inputRef = useFocusOnShow()

  return (
    <FormStep
      title={title}
      description="Standardowym momentem przejcia na emeryturę dla kobiet jest 60 lat, a dla mężczyzn 65. Możesz przeprowadzić symulację dla dowolnego wieku."
    >
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
              !!(form.errors.retirementAge && form.touched.retirementAge)
            }
            maxWidth="sm"
          >
            <Input
              {...field}
              ref={inputRef}
              size="lg"
              placeholder="Wiek emerytalny"
            />
            <FormErrorMessage>{form.errors.retirementAge}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
    </FormStep>
  )
}

const MonthlyRetirementStep: React.FC<{ title: string }> = ({ title }) => {
  const inputRef = useFocusOnShow()

  return (
    <FormStep
      title={title}
      description="Zdefiniuj wysokość swojej miesięcznej emerytury w złotówkach."
    >
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
                form.errors.monthlyRetirement && form.touched.monthlyRetirement
              )
            }
            maxWidth="sm"
          >
            <InputGroup>
              <Input
                {...field}
                ref={inputRef}
                size="lg"
                placeholder="Wysokość miesięcznej emerytury"
              />
              <InputRightElement
                color="gray.400"
                fontSize="1.2em"
                top={1}
                children="zł"
              />
            </InputGroup>
            <FormErrorMessage>{form.errors.monthlyRetirement}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
    </FormStep>
  )
}

const ReturnOnInvestmentStep: React.FC<{ title: string }> = ({ title }) => {
  const options = [
    {
      title: 'Bankowe produkty inwestycyjne',
      value: '3',
      icon: bank,
    },
    {
      title: 'Fundusze inwestycyjne oraz obligacje',
      value: '5',
      icon: news,
    },
    {
      title: 'Fundusze indeksowe oraz akcje indywidualne',
      value: '8',
      icon: stock,
    },
  ]

  const { setFieldValue } = useFormikContext()

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'returnOnInvestment',
    defaultValue: '3',
    onChange: (value: string) => {
      setFieldValue('returnOnInvestmentDuringSaving', value)
      setFieldValue('returnOnInvestmentDuringRetirement', value)
    },
  })

  const group = getRootProps()

  return (
    <FormStep
      title={title}
      description="Wybierz przykładowy sposób pomnażania oszczędności, którego stopa zwrotu najlepiej odzwierciedla twoje możliwości inwestycyjne. Dokładną stopę zwrotu będziesz mógł dostosować później."
    >
      <Stack
        spacing={6}
        direction={{ md: 'row', base: 'column' }}
        alignItems="stretch"
        {...group}
      >
        {options.map(({ title, value, icon }) => {
          const props = getRadioProps({
            value,
            enterKeyHint: value,
          })
          return <RadioTile key={value} title={title} icon={icon} {...props} />
        })}
      </Stack>
    </FormStep>
  )
}

export const steps: FormStepSchema[] = [
  {
    name: 'age',
    title: 'Ile masz lat?',
    validation: validateAge,
    component: AgeStep,
  },
  {
    name: 'retirementAge',
    title: 'W jakim wieku chcesz przejść na emeryturę?',
    validation: validateRetirementAge,
    component: RetirementAgeStep,
  },
  {
    name: 'monthlyRetirement',
    title: 'Jaką chcesz mieć miesięczną emeryturę?',
    validation: validateMonthlyRetirement,
    component: MonthlyRetirementStep,
  },
  {
    name: 'returnOnInvestment',
    title: 'Jak chcesz pomnażać swoje oszczędności?',
    component: ReturnOnInvestmentStep,
  },
]

const stepValidation = createStepValidator(steps)

const PlanForm: React.FC<{
  step: number
  setStep: Function
  values: PlanFormValues
  setValues: Function
}> = ({ step, setStep, values, setValues }) => {
  const isTablet = useBreakpointValue({ base: true, lg: false })

  return (
    <>
      {!isTablet && <PageBackground />}
      <Header />
      <PageContainer>
        <HStack spacing={8} my={16} alignItems="flex-start">
          {!isTablet && (
            <Box flex="1">
              <Heading fontSize="2xl" mb={12}>
                Plan oszczędzania
              </Heading>
              <Box as="nav">
                {steps.map(({ name, title }: FormStepSchema, index) => {
                  const disabled = step < index
                  const checked = step > index
                  return (
                    <FormStepButton
                      key={name}
                      disabled={disabled}
                      title={title}
                      checked={checked}
                      onClick={() => setStep(index)}
                      mb={8}
                    />
                  )
                })}
              </Box>
            </Box>
          )}
          <Box flex="2">
            <Formik<PlanFormValues>
              initialValues={values}
              validate={(values) => {
                return stepValidation(values, step)
              }}
              validateOnChange={false}
              onSubmit={(values) => {
                setValues(values)
                setStep(step + 1)
              }}
            >
              {() => (
                <Form>
                  {steps.map(
                    (
                      { name, title, component: Component }: FormStepSchema,
                      index
                    ) =>
                      step === index && <Component key={name} title={title} />
                  )}
                  <Center mt={8}>
                    <Button size="lg" type="submit">
                      {step === steps.length - 1
                        ? 'Wygeneruj plan'
                        : 'Następny krok'}
                    </Button>
                  </Center>
                </Form>
              )}
            </Formik>
          </Box>
        </HStack>
      </PageContainer>
    </>
  )
}

export default PlanForm
