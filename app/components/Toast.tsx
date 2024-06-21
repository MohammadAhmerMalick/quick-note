'use client'

import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

const Toast = () => {
  return (
    <ToastContainer
      toastClassName={() =>
        `bg-gray-50 text-gray-900  dark:bg-gray-700 dark:text-white  md:m-0 md:mb-4 m-4 relative text-base flex p-2 md:min-h-16 min-h-12 rounded-md justify-between overflow-hidden cursor-pointer`
      }
    />
  )
}

export default Toast
