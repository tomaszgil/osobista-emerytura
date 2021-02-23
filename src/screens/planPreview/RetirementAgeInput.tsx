import * as React from 'react'
import {
  FormControl,
  Input,
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

const RetirementAgeInput: React.FC = () => {
  return (
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
        >
          <FormLabel>Wiek emerytalny</FormLabel>
          <Input {...field} placeholder="Wiek emerytalny" />
          <FormErrorMessage>{form.errors.retirementAge}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  )
}

export default RetirementAgeInput
