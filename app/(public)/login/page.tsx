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
      className="mx-auto max-w-xl rounded-lg bg-white p-6 shadow md:mt-0 md:p-8 dark:border dark:border-neutral-800 dark:bg-neutral-850"
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
