'use client'

import { useState, type FormEvent } from 'react'

import Input from '@/components/Input'
import Button from '@/components/Button'
import ThemeSelector from '@/components/ThemeSelector'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log({
      email,
      password,
    })
  }

  return (
    <main className="px-3 py-3">
      <div className="text-right">
        <ThemeSelector />
      </div>
      <h1 className="md:text-4xl text-xl font-semibold text-neutral-950 dark:text-neutral-50 text-center md:mt-0 mt-4 md:mb-8 mb-2">
        Quick Note
      </h1>
      <form
        onSubmit={onSubmit}
        className="max-w-xl md:p-8 p-6 mx-auto bg-white rounded-lg shadow dark:border md:mt-0 dark:bg-neutral-850 dark:border-neutral-800"
      >
        <div className="mb-6">
          <Input
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
        <Button>Login</Button>
      </form>
      <p className="max-w-xl text-xs text-neutral-600 dark:text-neutral-500 mx-auto text-center p-2 mt-1">
        Powered by:{' '}
        <a
          href="https://www.mohammadahmermalick.com"
          className="text-neutral-950 dark:text-neutral-400 border-b border-neutral-500"
        >
          Mohammad Ahmer Malick
        </a>
      </p>
    </main>
  )
}

export default Login
