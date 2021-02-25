import React from 'react'
import {
  Input,
  InputGroup,
  InputRightElement,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/react'
import {
  Field,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  FieldInputProps,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  FormikProps,
} from 'formik'
import FormStep from '../../components/FormStep'
import useFocusOnShow from '../../utils/useFocusOnShow'

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

export default MonthlyRetirementStep
