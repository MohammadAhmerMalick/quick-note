'use client'

import { ElementType, useEffect, useState } from 'react'

import { classnames } from '@/utils'
import { FiFiMoonIcon, FiFiSunIcon, FiFiMonitorIcon } from '@/components/icons'

type themeModes = 'dark' | 'light' | 'system'

interface Option {
  id: themeModes
  icon: ElementType
}

// Theme Options
const options: Option[] = [
  { id: 'light', icon: FiFiSunIcon },
  { id: 'system', icon: FiFiMonitorIcon },
  { id: 'dark', icon: FiFiMoonIcon },
]

const ThemeSelector = () => {
  const [selected, setSelected] = useState<Option['id']>('system')

  const onThemeChange = async (option: Option['id']) => {
    setSelected(option)
    document.cookie = `theme=${option}` // update coockie to store the theme state on page reload
  }

  useEffect(() => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light'

    const html = document.documentElement.classList
    if (selected === 'light') html.remove('dark')
    else if (selected === 'dark') html.add('dark')
    else if (selected === 'system' && systemTheme === 'dark') html.add('dark')
    else html.remove('dark')
  }, [selected])

  // check cookie stored theme option
  useEffect(() => {
    // getting selected theme from the cookie
    const theme = (`; ${document?.cookie}`
      .split('; theme=')
      .pop()
      ?.split(';')
      .shift() || 'system') as Option['id']

    // update the state
    setSelected(theme)
  }, [])

  return (
    <div className="inline-flex p-1 ms-auto shadow rounded-full border dark:border-neutral-700">
      {options.map((option) => (
        <button
          type="button"
          key={option.id}
          aria-label={option.id}
          onClick={() => onThemeChange(option.id)}
          className={classnames(
            selected === option.id
              ? 'shadow border-transparent dark:border-neutral-700 bg-white dark:bg-neutral-800'
              : 'border-transparent',
            'md:p-2 p-1 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-full border text-ss'
          )}
        >
          <option.icon />
        </button>
      ))}
    </div>
  )
}

export default ThemeSelector
