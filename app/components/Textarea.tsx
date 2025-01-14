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
      className="mb-2 block text-sm font-medium text-neutral-900 dark:text-white"
    >
      {labelText}
      <textarea
        id={id}
        rows={rows}
        value={value}
        placeholder={placeholder}
        className="mt-3 block w-full rounded-md border border-neutral-300 bg-neutral-50 p-2.5 text-xs text-neutral-900 focus:border-primary focus:ring-1 focus:ring-yellow-200 focus-visible:outline-0 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-400 dark:focus:border-primary dark:focus:ring-1 dark:focus:ring-yellow-950"
        onChange={({ currentTarget }) => onChange(currentTarget)}
      />
    </label>
  )
}

export default Textarea
