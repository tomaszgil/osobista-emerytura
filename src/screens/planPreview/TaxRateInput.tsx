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

const TaxRateInput: React.FC = () => {
  return (
    <Field name="taxRate" type="number">
      {({
        field,
        form,
      }: {
        field: FieldInputProps<''>
        form: FormikProps<PlanFormValues>
      }) => (
        <FormControl
          isInvalid={!!(form.errors.taxRate && form.touched.taxRate)}
        >
          <FormLabel>Podatek od zysków z inwestycji</FormLabel>
          <InputGroup>
            <Input {...field} placeholder="Stopa podatku" />
            <InputRightElement color="gray.400" children="%" />
          </InputGroup>
          <FormErrorMessage>{form.errors.taxRate}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  )
}

export default TaxRateInput
