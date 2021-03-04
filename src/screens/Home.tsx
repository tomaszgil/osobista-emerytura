import React from 'react'
import PageContainer from '../components/PageContainer'
import Header from '../components/Header'
import Footer from '../components/Footer'
import InfoIconBox from '../components/InfoIconBox'
import SuspenseImg from '../components/SuspenseImg'
import {
  Stack,
  Box,
  Heading,
  Button,
  Link,
  Container,
  Text,
  Flex,
  Divider,
  SimpleGrid,
  AspectRatio,
  Skeleton,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import banker from '../assets/banker.svg'
import clock from '../assets/clock.svg'
import weather from '../assets/weather.svg'
import stock from '../assets/stock.svg'
import health from '../assets/health.svg'

const Home: React.FC = () => {
  return (
    <>
      <Box background="purple.50">
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
                Nie czekaj na państwową emeryturę
              </Heading>
              <Text my={6} fontSize="xl">
                Stwórz własny plan, który pozwoli Ci zaoszczędzić dodatkowe
                pieniądze na osobistą emeryturę.
              </Text>
              <Stack
                spacing={[4, 8]}
                direction={['column', 'row']}
                alignItems={[null, 'center']}
              >
                <Button size="lg" to="/plan" as={RouterLink}>
                  Stwórz plan
                </Button>
                <Link fontSize="lg" to="/emerytura" as={RouterLink}>
                  Dowiedz się więcej
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
                <SuspenseImg src={banker} />
              </React.Suspense>
            </Box>
          </Stack>
        </PageContainer>
      </Box>
      <Box py={24}>
        <PageContainer>
          <Container maxWidth="3xl" mb={16} centering>
            <Heading textAlign="center" mb={6}>
              Dlaczego osobista emerytura?
            </Heading>
            <Text fontSize="lg" textAlign="center">
              Dzięki odpowiedniej wiedzy i systematyczności jesteś w stanie
              zbudować kapitał, który może powiększyć twoją przyszłą emeryturę
              lub zagwarantować wolność finansową.
            </Text>
          </Container>
          <SimpleGrid
            columns={{ md: 2, lg: 4 }}
            spacing={8}
            mb={16}
            alignItems="flex-start"
          >
            <InfoIconBox icon={health} title="Kondycja ubezpieczeń społecznych">
              Prognozuje się, że za ok. 30 lat emerytura z ZUS będzie wynosić
              nie więcej niż 30% ostatniego wynagrodzenia. W takim scenariuszu
              osoba zarabiająca 5&nbsp;000 złotych otrzyma około 1&nbsp;500
              złotych emerytury.
            </InfoIconBox>
            <InfoIconBox
              icon={clock}
              title="Horyzont czasowy działa na twoją korzyść"
            >
              Im wcześniej zaczniesz oszczędzać, tym mniej będziesz musiał
              odkładać w każdym miesiącu przed emeryturą. To tak proste.
            </InfoIconBox>
            <InfoIconBox icon={weather} title="Dbanie o własną przyszłość">
              Określając własny plan emerytalny uświadamiasz sobie ile tak
              naprawdę jesteś w stanie zgromadzić. Mając tę wiedzę, możesz wziąć
              sprawy w swoje ręce.
            </InfoIconBox>
            <InfoIconBox icon={stock} title="Droga do wolności finansowej">
              Gromadząc kapitał w określonej wysokości oraz inwestując go
              zgodnie z obraną strategią można dojść do momentu, w którym zwroty
              z inwestycji pokrywają koszty życia. Od tej chwili praca zarobkowa
              jest opcjonalna.
            </InfoIconBox>
          </SimpleGrid>
          <Flex justifyContent="center">
            <Button size="lg" as={RouterLink} to="/emerytura">
              Dowiedz się więcej
            </Button>
          </Flex>
        </PageContainer>
      </Box>
      <Divider />
      <Footer />
    </>
  )
}

export default Home
