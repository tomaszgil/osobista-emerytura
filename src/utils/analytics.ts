// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ReactGA, { EventArgs } from 'react-ga'

export function initialize() {
  process.env.NODE_ENV === 'production' &&
    process.env.TRACKING_ID &&
    ReactGA.initialize(process.env.TRACKING_ID)
}

export function track(data: EventArgs) {
  return ReactGA.event(data)
}
