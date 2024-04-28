import ThemeSelector from '@/components/ThemeSelector'

export default function Home() {
  return (
    <main className="px-3 py-3">
      <div className="text-right">
        <ThemeSelector />
      </div>
      <h1 className="md:text-4xl text-xl font-semibold text-neutral-950 dark:text-neutral-50 text-center md:mt-0 mt-4 md:mb-8 mb-2">
        Quick Note
      </h1>
      <form className="max-w-xl md:p-10 p-6 mx-auto bg-white rounded-lg shadow dark:border md:mt-0 dark:bg-neutral-850 dark:border-neutral-800">
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-neutral-900 dark:text-white"
          >
            Title
            <input
              type="text"
              id="titleTitle"
              className="mt-3 bg-neutral-50 border border-neutral-300 text-neutral-900 text-xs rounded-md focus:border-yellow-500 focus:ring-1 focus:ring-yellow-200 block w-full p-2.5 dark:bg-neutral-800 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:border-yellow-500 dark:focus:ring-1 dark:focus:ring-yellow-950 focus-visible:outline-0"
              placeholder="Title"
              required
            />
          </label>
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-neutral-900 dark:text-white"
          >
            Note
            <textarea
              rows={5}
              id="password"
              placeholder="Note"
              className="mt-3 bg-neutral-50 border border-neutral-300 text-neutral-900 text-xs rounded-md focus:border-yellow-500 focus:ring-1 focus:ring-yellow-200 block w-full p-2.5 dark:bg-neutral-800 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white dark:focus:border-yellow-500 dark:focus:ring-1 dark:focus:ring-yellow-950 focus-visible:outline-0"
            />
          </label>
        </div>

        <div className="mb-6">
          <span className="block mb-2 text-sm font-medium text-neutral-900 dark:text-white">
            Upload File
          </span>
          <label
            htmlFor="dropzone-file"
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
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
            </div>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>
        </div>
        <button
          type="submit"
          className="text-neutral-900 text-xs text-center font-semibold bg-PrimaryYellow bg-yellow-400 hover:bg-yellow-400 dark:bg-yellow-500 dark:hover:bg-yellow-600 focus:border-yellow-500 focus:outline-none rounded-md focus:ring-1 focus:ring-yellow-200 px-5 py-2.5 w-full block"
        >
          Submit
        </button>
      </form>
      <p className="max-w-xl text-xs text-neutral-600 dark:text-neutral-500 mx-auto text-center p-2">
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
