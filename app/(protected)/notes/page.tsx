import Image from 'next/image'

import Button from '@/components/Button'
import { classnames } from '@/app/utils'
import ThemeSelector from '@/components/ThemeSelector'

const page = () => {
  const notes = [
    {
      id: 1,
      file: {
        src: 'https://www.mohammadahmermalick.com/images/web-development.svg',
        type: 'image',
      },
      title: 'Noteworthy technology acquisitions 2021',
      description:
        ' Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
    },
    {
      id: 2,
      file: {
        src: '',
        type: 'image',
      },
      title: 'Noteworthy technology acquisitions 2021',
      description: ` 
        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
        `,
    },
    {
      id: 3,
      file: {
        src: 'https://www.mohammadahmermalick.com/images/web-development.svg',
        type: 'image',
      },
      title:
        'Noteworthy technology acquisitions 2021Noteworthy technology acquisitions 2021',
      description:
        ' Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
    },
    {
      id: 4,
      file: {
        src: 'https://www.mohammadahmermalick.com/images/web-development.svg',
        type: 'image',
      },
      title: 'Noteworthy technology acquisitions 2021',
      description:
        ' Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
    },
    {
      id: 5,
      file: {
        src: 'https://www.mohammadahmermalick.com/images/web-development.svg',
        type: 'image',
      },
      title: 'Noteworthy technology acquisitions 2021',
      description:
        ' Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.',
    },
  ]

  return (
    <main className="px-3 py-3">
      <div className="text-right">
        <ThemeSelector />
      </div>
      <div className="flex gap-5 flex-wrap justify-center mt-8">
        {notes.map((note) => (
          <div
            key={note.id}
            className={classnames(
              'grid align-top',
              note.file.src ? 'grid-rows-[208px_auto]' : 'grid-rows-1',
              'max-w-80 bg-white rounded-lg shadow dark:border md:mt-0 dark:bg-neutral-850 dark:border-neutral-800'
            )}
          >
            {note.file?.src && (
              <div>
                <Image
                  width={320}
                  height={208}
                  className="rounded-t-lg h-52"
                  src={note.file.src}
                  alt=""
                />
              </div>
            )}
            <div className={classnames('flex flex-col', 'h-full', 'p-5')}>
              <span>
                <h5
                  title={note.title}
                  className="mb-2 text-lg font-bold text-gray-900 dark:text-white line-clamp-2"
                >
                  {note.title}
                </h5>
              </span>
              <p
                title={note.description}
                className={classnames(
                  'mb-3',
                  'text-sm font-normal text-gray-700 dark:text-gray-400',
                  note.file.src ? 'line-clamp-5' : 'line-clamp-15'
                )}
              >
                {note.description}
              </p>
              <div className="mt-auto">
                <Button>Read more</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default page
