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

const AgeStep: React.FC<{ title: string }> = ({ title }) => {
  const inputRef = useFocusOnShow()

  return (
    <FormStep
      title={title}
      description="Potrzebujemy tej informacji, żeby obliczyć ile lat będziesz odkładać na emeryturę. Zakładamy, że zaczynasz odkładać już teraz. Wszystkie dane będziesz mógł dostosować później."
    >
      <Field name="age" type="number">
        {({
          field,
          form,
        }: {
          field: FieldInputProps<''>
          form: FormikProps<PlanFormValues>
        }) => (
          <FormControl
            isInvalid={!!(form.errors.age && form.touched.age)}
            maxWidth="sm"
          >
            <Input {...field} ref={inputRef} size="lg" placeholder="Wiek" />
            <FormErrorMessage>{form.errors.age}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
    </FormStep>
  )
}

export default AgeStep
