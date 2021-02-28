import React from 'react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Box, Heading, chakra, Text, ChakraProps } from '@chakra-ui/react'

const InfoBox: React.FC<
  {
    icon: string
    title: string
    children: React.ReactNode
  } & ChakraProps
> = ({ icon, title, children, ...styleProps }) => (
  <Box flex="1" {...styleProps}>
    <chakra.img src={icon} mb={4} height="4rem"></chakra.img>
    <Heading fontSize="2xl" mb={4}>
      {title}
    </Heading>
    <Text>{children}</Text>
  </Box>
)

export default InfoBox
