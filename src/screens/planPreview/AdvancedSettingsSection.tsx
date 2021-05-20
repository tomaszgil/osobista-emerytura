import React from 'react'
import { FormControl, Switch, FormLabel } from '@chakra-ui/react'
import { useField } from 'formik'

const AdvancedSettingsSection: React.FC = ({ children }) => {
  const [field] = useField('advancedSettings')

  return (
    <>
      <FormControl display="flex" alignItems="center" mb={4}>
        <FormLabel fontSize="xl" color="brand.900" fontWeight="bold" mb="0">
          Zaawansowana symulacja
          <Switch isChecked={field.value} {...field} ml={4} />
        </FormLabel>
      </FormControl>
      {field.value && children}
    </>
  )
}

export default AdvancedSettingsSection
