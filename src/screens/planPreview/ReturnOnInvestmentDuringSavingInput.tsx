import * as React from 'react'
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

const ReturnOnInvestmentDuringSavingInput: React.FC = () => {
  return (
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
          <FormLabel>Zwrot z inwestycji (w czasie oszczędzania)</FormLabel>
          <InputGroup>
            <Input {...field} placeholder="Zwrot z inwestycji" />
            <InputRightElement color="gray.400" children="%" />
          </InputGroup>
          <FormErrorMessage>
            {form.errors.returnOnInvestmentDuringSaving}
          </FormErrorMessage>
        </FormControl>
      )}
    </Field>
  )
}

export default ReturnOnInvestmentDuringSavingInput
