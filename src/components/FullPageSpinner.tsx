import React from 'react'
import { Flex, Spinner } from '@chakra-ui/react'

const FullPageSpinner: React.FC = () => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      position="absolute"
      height="100vh"
      width="100%"
      zIndex="hide"
    >
      <Spinner size="xl" thickness="4px" color="brand.700" />
    </Flex>
  )
}

export default FullPageSpinner
