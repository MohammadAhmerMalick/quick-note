import Image from 'next/image'

import { classnames } from '@/utils'
import Button from '@/components/Button'

export interface NoteInterface {
  id: number
  file: {
    src: string
    type: string
  }
  title: string
  description: string
}

interface NoteCardProp {
  note: NoteInterface
}

const NoteCard = ({ note }: NoteCardProp) => {
  return (
    <div
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
  )
}

export default NoteCard
