export default function Home() {
  return (
    <main className="px-5 md:py-5 py-3">
      <h1 className="md:text-4xl text-3xl font-semibold text-slate-950 dark:text-slate-50 text-center mb-8 mt-10">
        Add Quick Note
      </h1>

      <form className="max-w-lg mx-auto">
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
          >
            Title
            <input
              type="text"
              id="titleTitle"
              className="mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:border-yellow-500 focus:ring-1 focus:ring-yellow-200 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-yellow-500 dark:focus:ring-1 dark:focus:ring-yellow-950 focus-visible:outline-0"
              placeholder="Title"
              required
            />
          </label>
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
          >
            Note
            <textarea
              rows={5}
              id="password"
              placeholder="Note"
              className="mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:border-yellow-500 focus:ring-1 focus:ring-yellow-200 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-yellow-500 dark:focus:ring-1 dark:focus:ring-yellow-950 focus-visible:outline-0"
            />
          </label>
        </div>

        <div className="mb-6">
          <span className="block mb-2 text-md font-medium text-gray-900 dark:text-white">
            Upload File
          </span>
          <label
            htmlFor="dropzone-file"
            className="mt-3 flex flex-col items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex pt-5 pb-6 items-center gap-5">
              <svg
                className="w-8 h-8 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <div>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 800x400px)
                </p>
              </div>
            </div>
            <input id="dropzone-file" type="file" className="hidden" />
          </label>
        </div>
        <button
          type="submit"
          className="text-slate-900 bg-yellow-400 hover:bg-yellow-400 focus:outline-none font-semibold rounded-md text-sm  px-5 py-2.5 text-center dark:bg-yellow-500 dark:hover:bg-yellow-600  focus:border-yellow-500 focus:ring-1 focus:ring-yellow-200 w-full block bg-PrimaryYellow"
        >
          Submit
        </button>
      </form>
    </main>
  )
}
