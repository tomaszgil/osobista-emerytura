import * as React from 'react'
import PageContainer from '../components/PageContainer'
import Header from '../components/Header'
import {
  HStack,
  Text,
  Box,
  Flex,
  Heading,
  Button,
  Input,
  FormControl,
  Center,
  FormErrorMessage,
  useRadioGroup,
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
import CheckIconBox from '../components/CheckIconBox'
import bank from '../assets/bank.svg'
import news from '../assets/news.svg'
import stock from '../assets/stock.svg'
import {
  validateAge,
  validateRetirementAge,
  validateMonthlyRetirement,
} from '../utils/validation'

const AgeStep: React.FC<{ active: boolean; title: string }> = ({
  active,
  title,
}) => (
  <FormStep
    active={active}
    title={title}
    explanation="Potrzebujemy tej informacji, żeby obliczyć ile lat będziesz odkładać na emeryturę. Zakładamy, że zaczynasz odkładać już teraz. Wszystkie dane będziesz mógł dostosować później."
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
          <Input {...field} size="lg" placeholder="Wiek" />
          <FormErrorMessage>{form.errors.age}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  </FormStep>
)

const RetirementAgeStep: React.FC<{ active: boolean; title: string }> = ({
  active,
  title,
}) => {
  return (
    <FormStep
      active={active}
      title={title}
      explanation="Standardowym momentem przejcia na emeryturę dla kobiet jest 60 lat, a dla mężczyzn 65. Możesz przeprowadzić symulację dla dowolnego wieku."
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
            <Input {...field} size="lg" placeholder="Wiek emerytalny" />
            <FormErrorMessage>{form.errors.retirementAge}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
    </FormStep>
  )
}

const MonthlyRetirementStep: React.FC<{ active: boolean; title: string }> = ({
  active,
  title,
}) => {
  return (
    <FormStep
      active={active}
      title={title}
      explanation="Zdefiniuj wysokość swojej miesięcznej emerytury w złotówkach."
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

const ReturnOnInvestmentStep: React.FC<{ active: boolean; title: string }> = ({
  active,
  title,
}) => {
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
      title={title}
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
  title: string
  validation?: Function
  component: React.FC<{ active: boolean; title: string }>
}

const steps: FormStepSchema[] = [
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
      <Box position="absolute" height="100vh" width="100%" zIndex="hide">
        <Box
          position="absolute"
          background="purple.50"
          width="50%"
          height="100%"
        />
        <PageContainer>
          <Box position="relative" width="100%">
            <Box
              position="absolute"
              background="purple.50"
              width="33%"
              height="100vh"
              zIndex="1"
            />
            <Box
              position="absolute"
              width="100%"
              height="100vh"
              bg="white"
            ></Box>
          </Box>
        </PageContainer>
      </Box>
      <Header />
      <PageContainer>
        <HStack spacing={8} mt={16} alignItems="flex-start">
          <Box flex="1">
            <Heading fontSize="2xl" mb={12}>
              Plan oszczędzania
            </Heading>
            {steps.map(({ name, title }: FormStepSchema, index) => {
              const active = step >= index
              const checked = step > index
              return (
                <Flex
                  as="button"
                  textAlign="left"
                  disabled={!active}
                  key={name}
                  mb={8}
                  onClick={() => setStep(index)}
                >
                  <Box>
                    <CheckIconBox checked={checked} />
                  </Box>
                  <Text
                    as="span"
                    fontWeight="bold"
                    fontSize="1.125em"
                    ml={4}
                    opacity={active ? 1 : 0.4}
                    transition="0.2 all ease"
                  >
                    {title}
                  </Text>
                </Flex>
              )
            })}
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
                setStep(step + 1)
                if (step === steps.length - 1) {
                  console.log('submit', ...args)
                }
              }}
            >
              {() => (
                <Form>
                  {steps.map(
                    (
                      { name, title, component: Component }: FormStepSchema,
                      index
                    ) => (
                      <Component
                        key={name}
                        title={title}
                        active={step === index}
                      />
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
