import React from 'react'
import PageContainer from '../components/PageContainer'
import Header from '../components/Header'
import Footer from '../components/Footer'
import {
  Stack,
  Box,
  Heading,
  Button,
  Text,
  Divider,
  chakra,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import bankrupt from '../assets/bankrupt.svg'

const NotFound: React.FC = () => {
  return (
    <>
      <Header />
      <PageContainer>
        <Stack
          direction={['column', null, 'row']}
          spacing={8}
          alignItems="center"
          pt={16}
          pb={24}
        >
          <Box flex="1">
            <Heading fontSize={['4xl', null, '5xl']}>
              Ups, tutaj nie ma twoich pieniędzy...
            </Heading>
            <Text my={6} fontSize="xl">
              Przepraszamy, nie znaleźliśmy podanej strony. Możliwe, że została
              przeniesiona lub nigdy nie istniała.
            </Text>
            <Stack spacing={2} direction={['column', 'row']}>
              <Button size="lg" to="/plan" as={RouterLink}>
                Stwórz plan
              </Button>
              <Button variant="ghost" size="lg" to="/" as={RouterLink}>
                Wróć na stronę główną
              </Button>
            </Stack>
          </Box>
          <Box flex="1">
            <chakra.img src={bankrupt}></chakra.img>
          </Box>
        </Stack>
      </PageContainer>
      <Divider />
      <Footer />
    </>
  )
}

export default NotFound
