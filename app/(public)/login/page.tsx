'use client'

import { toast } from 'react-toastify'
import { useState, type FormEvent } from 'react'

import Input from '@/components/Input'
import Button from '@/components/Button'
import loginAction from '@/actions/loginAction'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setIsSubmitting(true)

    try {
      const { status, messages } = await loginAction(email, password)
      if (status === 'error')
        messages.forEach((message) => toast[status](message))
    } catch (error) {
      toast.error('Unable to login')
    } finally {
      setIsSubmitting(false)
    }
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
      <Button disabled={isSubmitting}>Login</Button>
    </form>
  )
}

export default Login
