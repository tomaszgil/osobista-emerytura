// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ReactGA, { EventArgs } from 'react-ga'

const TRACKING_ID = 'UA-121989512-3'

export function initialize() {
  ReactGA.initialize(TRACKING_ID)
}

export function track(data: EventArgs) {
  return ReactGA.event(data)
}
