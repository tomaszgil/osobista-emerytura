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

const AgeInput: React.FC = () => {
  return (
    <Field name="age" type="number">
      {({
        field,
        form,
      }: {
        field: FieldInputProps<''>
        form: FormikProps<PlanFormValues>
      }) => (
        <FormControl isInvalid={!!(form.errors.age && form.touched.age)}>
          <FormLabel>Wiek</FormLabel>
          <Input {...field} placeholder="Wiek" />
          <FormErrorMessage>{form.errors.age}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  )
}

export default AgeInput
