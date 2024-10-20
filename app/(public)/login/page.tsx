'use client'

import { useState, type FormEvent } from 'react'

import useAuth from '@/hooks/useAuth'
import Input from '@/components/Input'
import Button from '@/components/Button'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { isloading, login } = useAuth()

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    login(email, password)
  }

  return (
    <form
      onSubmit={onSubmit}
      className="max-w-xl md:p-8 p-6 mx-auto bg-white rounded-lg shadow dark:border md:mt-0 dark:bg-neutral-850 dark:border-neutral-800"
    >
      <div className="mb-6">
        <Input
          isFocused
          id="email"
          value={email}
          labelText="Email"
          placeholder="Email"
          onChange={({ value }) => setEmail(value)}
        />
      </div>
      <div className="mb-6">
        <Input
          id="password"
          type="password"
          value={password}
          labelText="Password"
          placeholder="Password"
          onChange={({ value }) => setPassword(value)}
        />
      </div>
      <Button disabled={isloading}>Login</Button>
    </form>
  )
}

export default Login
