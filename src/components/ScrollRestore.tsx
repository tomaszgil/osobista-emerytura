import React from 'react'
import { useLocation } from 'react-router-dom'

const ScrollRestore: React.FC = ({ children }) => {
  const { pathname } = useLocation()

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return <>{children}</>
}

export default ScrollRestore
