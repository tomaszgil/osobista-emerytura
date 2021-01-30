import * as React from 'react'
import { Box, Heading, Container, Text, Center } from '@chakra-ui/react'

const FormStep: React.FC<{
  title: string
  description: string
}> = ({ title, description, children }) => (
  <Box m={-1}>
    <Box p={1}>
      <Container maxW="2xl" textAlign="center">
        <Heading fontSize="4xl" mb={4}>
          {title}
        </Heading>
        <Text mb={8}>{description}</Text>
      </Container>
      <Center>{children}</Center>
    </Box>
  </Box>
)

export default FormStep
