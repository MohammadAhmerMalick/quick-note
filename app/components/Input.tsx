import { classnames } from '@/utils'

interface Input {
  id: string
  value: string
  labelText?: string
  placeholder: string
  isRequired?: boolean
  type?: 'text' | 'password' | 'email'
  onChange: (currentTarget: EventTarget & HTMLInputElement) => void
}

const Input = ({
  id,
  value,
  labelText,
  placeholder,
  isRequired,
  type = 'text',
  onChange,
}: Input) => {
  return (
    <label
      htmlFor={id}
      className="block text-sm font-medium text-neutral-900 dark:text-white"
    >
      {labelText}
      <input
        id={id}
        required={isRequired}
        type={type}
        value={value}
        placeholder={placeholder}
        className={classnames(
          labelText && 'mt-3',
          'bg-neutral-50 border border-neutral-300 text-neutral-900 text-xs rounded-md focus:border-yellow-500 focus:ring-1 focus:ring-yellow-200 block w-full p-2.5 dark:bg-neutral-800 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:border-yellow-500 dark:focus:ring-1 dark:focus:ring-yellow-950 focus-visible:outline-0'
        )}
        onChange={({ currentTarget }) => onChange(currentTarget)}
      />
    </label>
  )
}

export default Input
