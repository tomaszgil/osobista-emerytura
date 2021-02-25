import React from 'react'
import {
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react'
import {
  Field,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  FieldInputProps,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  FormikProps,
} from 'formik'

const MonthlyRetirementInput: React.FC = () => {
  return (
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
            !!(form.errors.monthlyRetirement && form.touched.monthlyRetirement)
          }
        >
          <FormLabel>Wysokość miesięcznej emerytury</FormLabel>
          <InputGroup>
            <Input {...field} placeholder="Wysokość miesięcznej emerytury" />
            <InputRightElement color="gray.400" children="zł" />
          </InputGroup>
          <FormErrorMessage>{form.errors.monthlyRetirement}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  )
}

export default MonthlyRetirementInput
