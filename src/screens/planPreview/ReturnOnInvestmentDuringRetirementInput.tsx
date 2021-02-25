import React from 'react'
import {
  FormControl,
  Input,
  FormLabel,
  InputGroup,
  InputRightElement,
  FormErrorMessage,
} from '@chakra-ui/react'
import {
  Field,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  FieldInputProps,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  FormikProps,
} from 'formik'

const ReturnOnInvestmentDuringRetirementInput: React.FC = () => {
  return (
    <Field name="returnOnInvestmentDuringRetirement" type="number">
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
          <FormLabel>Zwrot z inwestycji (w czasie emerytury)</FormLabel>
          <InputGroup>
            <Input {...field} placeholder="Zwrot z inwestycji" />
            <InputRightElement color="gray.400" children="%" />
          </InputGroup>
          <FormErrorMessage>
            {form.errors.returnOnInvestmentDuringRetirement}
          </FormErrorMessage>
        </FormControl>
      )}
    </Field>
  )
}

export default ReturnOnInvestmentDuringRetirementInput
