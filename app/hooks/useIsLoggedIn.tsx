import { useCallback, useEffect, useState } from 'react'

import varifyTokenAction from '@/actions/varifyTokenAction'

/**
 * check if the existing token is valid
 * @returns is user logged in(boolean)
 */
const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const verifyToken = useCallback(async (token: string) => {
    const isVerified = await varifyTokenAction(token)
    setIsLoggedIn(isVerified)
    setIsLoggedIn(document.cookie.includes('token'))
  }, [])

  useEffect(() => {
    const token = document.cookie.split('token=')[0]
    verifyToken(token)
  }, [verifyToken])

  return [isLoggedIn]
}

export default useIsLoggedIn
