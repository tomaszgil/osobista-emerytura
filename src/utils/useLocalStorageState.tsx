import React from 'react'

export default function useLocalStorageState(key: string, defaultValue: any) {
  const [state, setState] = React.useState(() => {
    let value
    try {
      value = JSON.parse(
        localStorage.getItem(key) || JSON.stringify(defaultValue)
      )
    } catch (error) {
      value = defaultValue
    }

    return value
  })

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [state, key])

  return [state, setState]
}
