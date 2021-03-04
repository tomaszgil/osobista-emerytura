import React from 'react'
import PageContainer from '../components/PageContainer'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ClippedHero from '../components/ClippedHero'
import { Box, Heading, Link, Text, Divider, SimpleGrid } from '@chakra-ui/react'
import mail from '../assets/mail.svg'

const Contact: React.FC = () => {
  return (
    <>
      <Box background="purple.50" overflow="hidden">
        <Header />
        <ClippedHero imgSrc={mail}>
          <Heading fontSize="4xl" mb={4}>
            Skontaktuj się z nami
          </Heading>
          <Text fontSize="xl">
            Zostaw nam swoje uwagi lub feedback korzystając z&nbsp;poniższego
            maila.
            <Text mt={4}>
              <Link href="mailto:tomaszgil.dev@gmail.com">
                tomaszgil.dev@gmail.com
              </Link>
            </Text>
          </Text>
        </ClippedHero>
      </Box>
      <Box py={24}>
        <PageContainer>
          <SimpleGrid
            columns={[null, null, 2]}
            spacing={8}
            alignItems="flex-start"
          >
            <Box flex="1">
              <Heading fontSize="2xl" mb={4}>
                Zobacz więcej projektów
              </Heading>
              <Text mb={4}>
                Jeśli chcesz zobaczyć więcej projektów, przejdź na poniższą
                stronę.
                <Text mt={2}>
                  <Link target="_blank" href="https://tomaszgil.me/">
                    tomaszgil.me
                  </Link>
                </Text>
              </Text>
            </Box>
          </SimpleGrid>
        </PageContainer>
      </Box>
      <Divider />
      <Footer />
    </>
  )
}

export default Contact
