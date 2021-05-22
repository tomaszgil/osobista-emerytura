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

const InflationRateInput: React.FC = () => {
  return (
    <Field name="inflationRate" type="number">
      {({
        field,
        form,
      }: {
        field: FieldInputProps<''>
        form: FormikProps<PlanFormValues>
      }) => (
        <FormControl
          isInvalid={
            !!(form.errors.inflationRate && form.touched.inflationRate)
          }
        >
          <FormLabel>Stopa inflacji</FormLabel>
          <InputGroup>
            <Input {...field} placeholder="Stopa inflacji" />
            <InputRightElement color="gray.400" children="%" />
          </InputGroup>
          <FormErrorMessage>{form.errors.inflationRate}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  )
}

export default InflationRateInput
