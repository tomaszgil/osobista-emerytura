import React from 'react'
import PageContainer from '../components/PageContainer'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Box, Heading, Link, Text, Divider, SimpleGrid } from '@chakra-ui/react'

const Home: React.FC = () => {
  return (
    <>
      <Box background="purple.50">
        <Header />
        <PageContainer>
          <Box pt={16} pb={24}>
            <Heading fontSize="4xl">Wykorzystane zasoby</Heading>
          </Box>
        </PageContainer>
      </Box>
      <Box py={24}>
        <PageContainer>
          <SimpleGrid
            columns={{ md: 2, lg: 4 }}
            spacing={8}
            alignItems="flex-start"
          >
            <Box flex="1">
              <Heading fontSize="2xl" mb={4}>
                Grafika
              </Heading>
              <Text mb={4}>
                Money vector created by pch.vector -{' '}
                <Link
                  target="_blank"
                  href="https://www.freepik.com/vectors/money"
                >
                  www.freepik.com
                </Link>
              </Text>
              <Text mb={4}>
                Business vector created by pch.vector -{' '}
                <Link
                  target="_blank"
                  href="https://www.freepik.com/vectors/business"
                >
                  www.freepik.com
                </Link>
              </Text>
              <Text mb={4}>
                People vector created by pch.vector -{' '}
                <Link
                  target="_blank"
                  href="https://www.freepik.com/vectors/people"
                >
                  www.freepik.com
                </Link>
              </Text>
              <Text mb={4}>
                Tree vector created by pch.vector -{' '}
                <Link
                  target="_blank"
                  href="https://www.freepik.com/vectors/tree"
                >
                  www.freepik.com
                </Link>
              </Text>
            </Box>
            <Box flex="1">
              <Heading fontSize="2xl" mb={4}>
                Ikony
              </Heading>
              <Text>
                Icons made by{' '}
                <Link
                  href="https://www.freepik.com"
                  target="_blank"
                  title="Freepik"
                >
                  Freepik
                </Link>{' '}
                from{' '}
                <Link
                  href="https://www.flaticon.com/"
                  target="_blank"
                  title="Flaticon"
                >
                  www.flaticon.com
                </Link>
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

export default Home
