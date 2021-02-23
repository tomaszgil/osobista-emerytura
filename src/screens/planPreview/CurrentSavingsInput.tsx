import * as React from 'react'
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

const CurrentSavingsInput: React.FC = () => {
  return (
    <Field name="currentSavings" type="number">
      {({
        field,
        form,
      }: {
        field: FieldInputProps<''>
        form: FormikProps<PlanFormValues>
      }) => (
        <FormControl
          isInvalid={
            !!(form.errors.currentSavings && form.touched.currentSavings)
          }
        >
          <FormLabel>Aktualne oszczędności</FormLabel>
          <InputGroup>
            <Input {...field} placeholder="Aktualne oszczędności" />
            <InputRightElement color="gray.400" children="zł" />
          </InputGroup>
          <FormErrorMessage>{form.errors.currentSavings}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  )
}

export default CurrentSavingsInput
