import React from 'react'

export default function useFocusOnShow() {
  const ref = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    ref.current?.focus()
  })

  return ref
}
