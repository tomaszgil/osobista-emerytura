import React from 'react'
import debounce from 'debounce'
import { useHistory } from 'react-router-dom'
import ReactGA from 'react-ga'

interface History {
  pathname: string
}

const trackHistory = debounce((location: History) => {
  console.log('changed')
  ReactGA.set({ page: location.pathname })
  ReactGA.pageview(location.pathname)
}, 100)

function RouteChangeTracker() {
  const history = useHistory()

  history.listen(trackHistory)

  return <></>
}

export default RouteChangeTracker
