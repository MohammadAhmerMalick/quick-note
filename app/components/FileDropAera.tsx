interface FileDropAera {
  id: string
  value: string
  onChange: (currentTarget: EventTarget & HTMLInputElement) => void
}

const FileDropAera = ({ id, value, onChange }: FileDropAera) => {
  return (
    <>
      <span className="block mb-2 text-sm font-medium text-neutral-900 dark:text-white">
        Upload File
      </span>
      <label
        htmlFor={id}
        className="px-4 md:py-12 py-6 mt-3 w-full flex justify-center cursor-pointer md:border-2 border border-neutral-300 hover:border-yellow-500 border-dashed rounded-lg dark:border-neutral-600 dark:hover:border-yellow-500 focus:border-yellow-500 bg-neutral-50 dark:hover:bg-bray-800 dark:bg-neutral-800"
      >
        <div className="flex items-center gap-5">
          <svg
            className="w-8 h-8 text-neutral-500 dark:text-neutral-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <div>
            <p className="mb-2 text-xs text-neutral-500 dark:text-neutral-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              SVG, PNG, JPG or GIF (MAX. 800x400px)
            </p>
          </div>
        </div>
        <input
          id={id}
          type="file"
          value={value}
          className="hidden"
          onChange={({ currentTarget }) => onChange(currentTarget)}
        />
      </label>
    </>
  )
}

export default FileDropAera
