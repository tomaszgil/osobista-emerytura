import * as React from 'react'
import {
  Box,
  Heading,
  Container,
  Text,
  Collapse,
  Center,
} from '@chakra-ui/react'

const FormStep: React.FC<{
  active: boolean
  title: string
  description: string
}> = ({ active, title, description, children }) => (
  <Box m={-1}>
    <Collapse in={active} key={title}>
      <Box p={1}>
        <Container maxW="2xl" textAlign="center">
          <Heading fontSize="4xl" mb={4}>
            {title}
          </Heading>
          <Text mb={8}>{description}</Text>
        </Container>
        <Center>{children}</Center>
      </Box>
    </Collapse>
  </Box>
)

export default FormStep
