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

const LifeExpectancyInput: React.FC = () => {
  return (
    <Field name="lifeExpectancy" type="number">
      {({
        field,
        form,
      }: {
        field: FieldInputProps<''>
        form: FormikProps<PlanFormValues>
      }) => (
        <FormControl
          isInvalid={
            !!(form.errors.lifeExpectancy && form.touched.lifeExpectancy)
          }
        >
          <FormLabel>Oczekiwana długość życia</FormLabel>
          <Input {...field} placeholder="Oczekiwana długość życia" />
          <FormErrorMessage>{form.errors.lifeExpectancy}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  )
}

export default LifeExpectancyInput
