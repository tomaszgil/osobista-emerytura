import React from 'react'
import PageContainer from '../components/PageContainer'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SuspenseImg from '../components/SuspenseImg'
import {
  Stack,
  Box,
  Heading,
  Button,
  Text,
  Divider,
  Skeleton,
  AspectRatio,
  Link,
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
            <Stack
              spacing={[2, 8]}
              alignItems={[null, 'center']}
              direction={['column', 'row']}
            >
              <Button size="lg" to="/" as={RouterLink}>
                Wróć na stronę główną
              </Button>
              <Link fontSize="lg" to="/kontakt" as={RouterLink}>
                Skontaktuj się z nami
              </Link>
            </Stack>
          </Box>
          <Box flex="1">
            <React.Suspense
              fallback={
                <AspectRatio width="100%" ratio={3 / 2}>
                  <Skeleton width="100%" height="100%" />
                </AspectRatio>
              }
            >
              <SuspenseImg src={bankrupt} />
            </React.Suspense>
          </Box>
        </Stack>
      </PageContainer>
      <Divider />
      <Footer />
    </>
  )
}

export default NotFound
