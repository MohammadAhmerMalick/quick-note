interface Textarea {
  id: string
  rows?: number
  value: string
  labelText: string
  placeholder: string
  onChange: (currentTarget: EventTarget & HTMLTextAreaElement) => void
}

const Textarea = ({
  id,
  value,
  rows = 5,
  labelText,
  placeholder,
  onChange,
}: Textarea) => {
  return (
    <label
      htmlFor={id}
      className="block mb-2 text-sm font-medium text-neutral-900 dark:text-white"
    >
      {labelText}
      <textarea
        id={id}
        rows={rows}
        value={value}
        placeholder={placeholder}
        className="mt-3 bg-neutral-50 border border-neutral-300 text-neutral-900 text-xs rounded-md focus:border-yellow-500 focus:ring-1 focus:ring-yellow-200 block w-full p-2.5 dark:bg-neutral-800 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:border-yellow-500 dark:focus:ring-1 dark:focus:ring-yellow-950 focus-visible:outline-0"
        onChange={({ currentTarget }) => onChange(currentTarget)}
      />
    </label>
  )
}

export default Textarea
