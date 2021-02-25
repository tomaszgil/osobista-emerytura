import React from 'react'
import { Input, FormControl, FormErrorMessage } from '@chakra-ui/react'
import {
  Field,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  FieldInputProps,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  FormikProps,
} from 'formik'
import FormStep from '../../components/FormStep'
import useFocusOnShow from '../../utils/useFocusOnShow'

const RetirementAgeStep: React.FC<{ title: string }> = ({ title }) => {
  const inputRef = useFocusOnShow()

  return (
    <FormStep
      title={title}
      description="Standardowym momentem przejcia na emeryturę dla kobiet jest 60 lat, a dla mężczyzn 65. Możesz przeprowadzić symulację dla dowolnego wieku."
    >
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
            maxWidth="sm"
          >
            <Input
              {...field}
              ref={inputRef}
              size="lg"
              placeholder="Wiek emerytalny"
            />
            <FormErrorMessage>{form.errors.retirementAge}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
    </FormStep>
  )
}

export default RetirementAgeStep
