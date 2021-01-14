import * as React from 'react'
import PageContainer from '../components/PageContainer'
import Header from '../components/Header'
import {
  HStack,
  Box,
  Heading,
  Button,
  Container,
  Text,
  Input,
  Flex,
  Collapse,
  FormControl,
  Center,
  FormErrorMessage,
  chakra,
  // eslint-disable-next-line
  UseRadioProps,
  useRadioGroup,
  useRadio,
} from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'
import { Formik, Field, Form, useFormikContext } from 'formik'
import bank from '../assets/bank.svg'
import news from '../assets/news.svg'
import stock from '../assets/stock.svg'

const FormStep: React.FC<{
  active: boolean
  title: string
  explanation: string
}> = ({ active, title, explanation, children }) => (
  <Box m={-1}>
    <Collapse in={active} key={title}>
      <Box p={1}>
        <Container maxW="2xl" textAlign="center">
          <Heading fontSize="4xl" mb={4}>
            {title}
          </Heading>
          <Text mb={8}>{explanation}</Text>
        </Container>
        <Center>{children}</Center>
      </Box>
    </Collapse>
  </Box>
)

function validateAge(value?: number): string | undefined {
  if (!value) {
    return 'Pole wymagane'
  } else if (value < 18 || value > 100) {
    return 'Wartość powinna być z przedziału 18 - 100'
  }
}

function validateRetirementAge(
  value?: number,
  values?: { age?: number }
): string | undefined {
  const genericError = validateAge(value)
  if (genericError) {
    return genericError
  }

  if (value && values && values.age && value <= values.age) {
    return 'Wiek emerytalny musi być większy od aktualnego wieku'
  }
}

function validateMonthlyRetirement(value?: number): string | undefined {
  if (!value) {
    return 'Pole wymagane'
  }
}

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

const CheckIconBox: React.FC<{ checked: boolean }> = ({ checked }) => (
  <Flex
    border="2px"
    borderColor="brand.700"
    borderRadius="50%"
    alignItems="center"
    justifyContent="center"
    width="1.5rem"
    height="1.5rem"
    {...(checked && {
      // Cannot import brand.700 here
      boxShadow: '0 0 0 1px #8758FA',
      bg: 'brand.700',
    })}
  >
    <CheckIcon
      color="white"
      transition="0.2s all ease"
      transform="scale(0)"
      {...(checked && {
        transform: 'scale(1)',
      })}
    />
  </Flex>
)

const RadioTile: React.FC<{ title: string; icon: string } & UseRadioProps> = ({
  title,
  icon,
  value,
  isChecked,
  ...props
}) => {
  const { getInputProps, getCheckboxProps } = useRadio({
    value,
    isChecked,
    ...props,
  })

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label" flex="1">
      <input {...input} />

      <Box
        {...checkbox}
        p={4}
        pb={6}
        cursor="pointer"
        borderRadius="base"
        border="1px"
        borderColor="gray.200"
        transition="all 0.2s ease"
        _checked={{
          borderColor: 'brand.700',
          // Cannot import brand.700 here
          boxShadow: '0 0 0 1px #8758FA',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
      >
        <Box textAlign="center">
          <Box textAlign="left">
            <CheckIconBox checked={!!isChecked} />
          </Box>
          <Center mb={4}>
            <chakra.img src={icon} height="4rem"></chakra.img>
          </Center>
          <Heading fontSize="1.125em" mb={2}>
            {title}
          </Heading>
          <Text>Przewidywana stopa zwrotu z inwestycji: {value}%</Text>
        </Box>
      </Box>
    </Box>
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

type FormValues = {
  age?: number
  retirementAge?: number
  monthlyRetirement?: number
  returnOnInvestment?: string
}

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
            <Formik<FormValues>
              initialValues={{
                age: undefined,
                retirementAge: undefined,
                monthlyRetirement: undefined,
                returnOnInvestment: '3',
              }}
              validate={(values) => {
                let errors = {}
                if (step >= 0) {
                  const error = validateAge(values.age)
                  if (error) {
                    errors = { ...errors, age: error }
                  }
                }
                if (step >= 1) {
                  const error = validateRetirementAge(
                    values.retirementAge,
                    values
                  )
                  if (error) {
                    errors = { ...errors, retirementAge: error }
                  }
                }
                if (step >= 2) {
                  const error = validateMonthlyRetirement(
                    values.monthlyRetirement
                  )
                  if (error) {
                    errors = { ...errors, monthlyRetirement: error }
                  }
                }

                return errors
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
                  <AgeStep active={step === 0} />
                  <RetirementAgeStep active={step === 1} />
                  <MonthlyRetirementStep active={step === 2} />
                  <ReturnOnInvestmentStep active={step === 3} />
                  <Center mt={8}>
                    <Button size="lg" type="submit">
                      {step === 3 ? 'Wygeneruj plan' : 'Następny krok'}
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
