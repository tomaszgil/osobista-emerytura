import * as React from 'react'
import {
  Box,
  Heading,
  Text,
  Center,
  chakra,
  // eslint-disable-next-line
  UseRadioProps,
  useRadio,
  useTheme,
} from '@chakra-ui/react'
import CheckIconBox from './CheckIconBox'

const RadioTile: React.FC<{ title: string; icon: string } & UseRadioProps> = ({
  title,
  icon,
  value,
  isChecked,
  ...props
}) => {
  const theme = useTheme()
  const brand700 = theme.colors.brand[700]

  const { getInputProps, getCheckboxProps } = useRadio({
    value,
    isChecked,
    ...props,
  })

  const input = getInputProps()
  const checkbox = getCheckboxProps()

  return (
    <Box as="label" flex="1">
      <input {...input} />

      <Box
        {...checkbox}
        p={4}
        pb={6}
        cursor="pointer"
        borderRadius="base"
        border="1px"
        borderColor="gray.200"
        transition="all 0.2s ease"
        _checked={{
          borderColor: 'brand.700',
          // Cannot import brand.700 here
          boxShadow: `0 0 0 1px ${brand700}`,
        }}
        _focus={{
          boxShadow: 'outline',
        }}
      >
        <Box textAlign="center">
          <Box textAlign="left">
            <CheckIconBox checked={!!isChecked} />
          </Box>
          <Center mb={4}>
            <chakra.img src={icon} height="4rem"></chakra.img>
          </Center>
          <Heading fontSize="1.125em" mb={2}>
            {title}
          </Heading>
          <Text>Przewidywana stopa zwrotu z inwestycji: {value}%</Text>
        </Box>
      </Box>
    </Box>
  )
}

export default RadioTile
