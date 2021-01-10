import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomeScreen from './screens/Home'
import NotFoundScreen from './screens/NotFound'
import PlanScreen from './screens/Plan'
import theme from './styles/theme'

export const App: React.FC = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <Switch>
        <Route exact path="/">
          <HomeScreen />
        </Route>
        <Route path="/plan">
          <PlanScreen />
        </Route>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </Router>
  </ChakraProvider>
)
