import React from 'react'
import { Flex, useTheme } from '@chakra-ui/react'
import { CheckIcon } from '@chakra-ui/icons'

const CheckIconBox: React.FC<{ checked: boolean }> = ({ checked }) => {
  const theme = useTheme()
  const brand700 = theme.colors.brand[700]

  return (
    <Flex
      role="presentation"
      aria-label={checked ? 'checked' : 'unchecked'}
      border="2px"
      borderColor="brand.700"
      borderRadius="50%"
      alignItems="center"
      justifyContent="center"
      width="1.5rem"
      height="1.5rem"
      {...(checked && {
        // Cannot import brand.700 here
        boxShadow: `0 0 0 1px ${brand700}`,
        bg: 'brand.700',
      })}
    >
      <CheckIcon
        color="white"
        transition="0.2s all ease"
        transform="scale(0)"
        {...(checked && {
          transform: 'scale(1)',
        })}
      />
    </Flex>
  )
}

export default CheckIconBox
