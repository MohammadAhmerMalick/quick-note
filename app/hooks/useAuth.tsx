import { toast } from 'react-toastify'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import loginAction from '@/actions/loginAction'
import logoutAction from '@/actions/logoutAction'
import verifyTokenAction from '@/actions/verifyTokenAction'

/**
 * check if the existing token is valid
 * @returns is user logged in(boolean)
 */
const useAuth = () => {
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isloading, setIsLoading] = useState(false)

  const verifyToken = useCallback(async (token: string) => {
    const isVerified = await verifyTokenAction(token)
    setIsLoggedIn(isVerified)
  }, [])

  const logOut = async () => {
    setIsLoading(true)
    await logoutAction()
    setIsLoggedIn(false)
    setIsLoading(false)
  }

  const login = async (email: string, password: string) => {
    setIsLoading(true)

    try {
      const { status, messages } = await loginAction(email, password)
      if (status === 'error')
        messages.forEach((message) => toast[status](message))
    } catch (error) {
      toast.error('Unable to login')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const token = document.cookie.split('token=')[1]
    verifyToken(token)
  }, [verifyToken, pathname])

  return { isLoggedIn, isloading, logOut, login }
}

export default useAuth
