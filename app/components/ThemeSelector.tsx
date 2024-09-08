'use client'

import { ElementType, useEffect, useState } from 'react'

import { classnames } from '@/utils'
import { FiFiMoonIcon, FiFiSunIcon } from '@/components/icons'

export enum ThemeModes {
  Dark = 'DARK',
  Light = 'LIGHT',
}

interface Option {
  id: ThemeModes
  icon: ElementType
}

// Theme Options
const options: Option[] = [
  { id: ThemeModes.Light, icon: FiFiSunIcon },
  { id: ThemeModes.Dark, icon: FiFiMoonIcon },
]

const ThemeSelector = () => {
  const [selected, setSelected] = useState<Option['id']>(ThemeModes.Dark)

  const onThemeChange = async (option: Option['id']) => {
    setSelected(option)
    document.cookie = `theme=${option}` // update coockie to store the theme state on page reload
  }

  useEffect(() => {
    const html = document.documentElement.classList
    if (selected === ThemeModes.Light) html.remove('dark')
    else if (selected === ThemeModes.Dark) html.add('dark')
  }, [selected])

  // check cookie stored theme option
  useEffect(() => {
    // getting selected theme from the cookie
    const theme = `; ${document?.cookie}`
      .split('; theme=')
      .pop()
      ?.split(';')
      .shift() as ThemeModes

    // update the state
    setSelected(theme || ThemeModes.Dark)
  }, [])

  return (
    <div className="inline-flex p-1 ms-auto shadow rounded-full border dark:border-neutral-600">
      {options.map((option) => (
        <button
          type="button"
          key={option.id}
          aria-label="theme"
          onClick={() => onThemeChange(option.id)}
          className={classnames(
            selected === option.id
              ? 'shadow border-transparent dark:border-neutral-600 bg-white dark:bg-neutral-800 z-10 sm:flex hidden'
              : 'border-transparent',
            'p-2 hover:bg-neutral-100 dark:hover:bg-neutral-600 focus:bg-neutral-100 dark:focus:bg-neutral-700 outline-0 rounded-full border'
          )}
        >
          <option.icon />
        </button>
      ))}
    </div>
  )
}

export default ThemeSelector
