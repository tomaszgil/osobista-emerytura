import * as React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import RouteChangeTracker from './components/RouteChangeTracker'
import FullPageSpinner from './components/FullPageSpinner'
import theme from './styles/theme'
import { initialize } from './utils/analytics'

const HomeScreen = React.lazy(
  () => import(/* webpackPrefetch: true */ './screens/Home')
)
const PlanScreen = React.lazy(
  () => import(/* webpackPrefetch: true */ './screens/Plan')
)
const NotFoundScreen = React.lazy(() => import('./screens/NotFound'))

initialize()

export const App: React.FC = () => (
  <ChakraProvider theme={theme}>
    <React.Suspense fallback={<FullPageSpinner />}>
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
        <RouteChangeTracker />
      </Router>
    </React.Suspense>
  </ChakraProvider>
)
