import React from 'react'
import PageContainer from '../components/PageContainer'
import Header from '../components/Header'
import {
  HStack,
  Box,
  Heading,
  Button,
  Center,
  useBreakpointValue,
} from '@chakra-ui/react'
import { Formik, Form } from 'formik'
import FormStepButton from '../components/FormStepButton'
import PageBackground from '../components/PageBackground'
import { createStepValidator } from '../services/validation'
import { track } from '../utils/analytics'
import steps from './planForm/steps'

const stepValidation = createStepValidator<PlanFormValues>(steps)

function logStepCompleted(step: number) {
  track({
    category: 'Plan',
    action: 'Completed form step',
    label: steps[step].name,
  })
}

const PlanForm: React.FC<{
  step: number
  setStep: Function
  values: PlanFormValues
  setValues: Function
}> = ({ step, setStep, values, setValues }) => {
  const isTablet = useBreakpointValue({ base: true, lg: false })

  function handleSubmit(values: PlanFormValues) {
    setValues(values)
    logStepCompleted(step)
    setStep(step + 1)
  }

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
              validate={(values) => stepValidation(values, step)}
              validateOnChange={false}
              onSubmit={handleSubmit}
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
