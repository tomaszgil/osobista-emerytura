import * as React from 'react'
import PageContainer from '../components/PageContainer'
import Header from '../components/Header'
import {
  HStack,
  Box,
  Heading,
  Button,
  Input,
  FormControl,
  Center,
  FormErrorMessage,
  useRadioGroup,
} from '@chakra-ui/react'
import { Formik, Field, Form, useFormikContext } from 'formik'
import FormStep from '../components/FormStep'
import RadioTile from '../components/RadioTile'
import bank from '../assets/bank.svg'
import news from '../assets/news.svg'
import stock from '../assets/stock.svg'
import {
  validateAge,
  validateRetirementAge,
  validateMonthlyRetirement,
} from '../utils/validation'

const AgeStep: React.FC<{ active: boolean }> = ({ active }) => (
  <FormStep
    active={active}
    title="Ile masz lat?"
    explanation="Potrzebujemy tej informacji, żeby obliczyć ile lat będziesz odkładać na emeryturę. Zakładamy, że zaczynasz odkładać już teraz. Wszystkie dane będziesz mógł dostosować później."
  >
    <Field name="age" type="number">
      {({ field, form }: { field: any; form: any }) => (
        <FormControl
          isInvalid={form.errors.age && form.touched.age}
          maxWidth="sm"
        >
          <Input {...field} size="lg" placeholder="Wiek" />
          <FormErrorMessage>{form.errors.age}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  </FormStep>
)

const RetirementAgeStep: React.FC<{ active: boolean }> = ({ active }) => {
  return (
    <FormStep
      active={active}
      title="W jakim wieku chcesz przejść na emeryturę?"
      explanation="Standardowym momentem przejcia na emeryturę dla kobiet jest 60 lat, a dla mężczyzn 65. Możesz przeprowadzić symulację dla dowolnego wieku."
    >
      <Field name="retirementAge" type="number">
        {({ field, form }: { field: any; form: any }) => (
          <FormControl
            isInvalid={form.errors.retirementAge && form.touched.retirementAge}
            maxWidth="sm"
          >
            <Input {...field} size="lg" placeholder="Wiek emerytalny" />
            <FormErrorMessage>{form.errors.retirementAge}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
    </FormStep>
  )
}

const MonthlyRetirementStep: React.FC<{ active: boolean }> = ({ active }) => {
  return (
    <FormStep
      active={active}
      title="Jaką chcesz mieć miesięczną emeryturę?"
      explanation="Zdefiniuj wysokość swojej miesięcznej emerytury w złotówkach."
    >
      <Field name="monthlyRetirement" type="number">
        {({ field, form }: { field: any; form: any }) => (
          <FormControl
            isInvalid={
              form.errors.monthlyRetirement && form.touched.monthlyRetirement
            }
            maxWidth="sm"
          >
            <Input
              {...field}
              size="lg"
              placeholder="Wysokość miesięcznej emerytury"
            />
            <FormErrorMessage>{form.errors.monthlyRetirement}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
    </FormStep>
  )
}

const ReturnOnInvestmentStep: React.FC<{ active: boolean }> = ({ active }) => {
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
      setFieldValue('returnOnInvestment', value)
    },
  })

  const group = getRootProps()

  return (
    <FormStep
      active={active}
      title="Jak chcesz pomnażać swoje oszczędności?"
      explanation="Wybierz przykładowy sposób pomnażania oszczędności, którego stopa zwrotu najlepiej odzwierciedla twoje możliwości inwestycyjne. Dokładną stopę zwrotu będziesz mógł dostosować później."
    >
      <HStack spacing={6} alignItems="stretch" {...group}>
        {options.map(({ title, value, icon }) => {
          const props = getRadioProps({
            value,
            enterKeyHint: value,
          })
          return <RadioTile key={value} title={title} icon={icon} {...props} />
        })}
      </HStack>
    </FormStep>
  )
}

type FormStepSchema = {
  name: string
  validation?: Function
  component: React.FC<{ active: boolean }>
}

const steps: FormStepSchema[] = [
  {
    name: 'age',
    validation: validateAge,
    component: AgeStep,
  },
  {
    name: 'retirementAge',
    validation: validateRetirementAge,
    component: RetirementAgeStep,
  },
  {
    name: 'monthlyRetirement',
    validation: validateMonthlyRetirement,
    component: MonthlyRetirementStep,
  },
  {
    name: 'returnOnInvestment',
    component: ReturnOnInvestmentStep,
  },
]

function createStepValidator(steps: FormStepSchema[]) {
  return function (values: PlanFormValues, step: number) {
    let errors = {}
    const stepsToVerify = steps.slice(0, step + 1)
    stepsToVerify.forEach(({ name, validation }: FormStepSchema) => {
      if (validation) {
        const error = validation(values)
        if (error) {
          errors = { ...errors, [name]: error }
        }
      }
    })
    return errors
  }
}

const stepValidation = createStepValidator(steps)

const PlanScreen: React.FC = () => {
  const [step, setStep] = React.useState(0)

  return (
    <>
      <Box
        background="purple.50"
        position="absolute"
        width="33%"
        height="100vh"
        zIndex="hide"
      />
      <Header />
      <PageContainer>
        <HStack spacing={8} mt={16} alignItems="flex-start">
          <Box flex="1">
            <Heading fontSize="2xl">Plan oszczędzania</Heading>
          </Box>
          <Box flex="2">
            <Formik<PlanFormValues>
              initialValues={{
                age: '',
                retirementAge: '',
                monthlyRetirement: '',
                returnOnInvestment: '3',
              }}
              validate={(values) => {
                return stepValidation(values, step)
              }}
              validateOnChange={false}
              onSubmit={(...args: any[]) => {
                if (step < 3) {
                  setStep(step + 1)
                } else {
                  console.log('submit', ...args)
                }
              }}
            >
              {() => (
                <Form>
                  {steps.map(
                    ({ name, component: Component }: FormStepSchema, index) => (
                      <Component key={name} active={step === index} />
                    )
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

export default PlanScreen
