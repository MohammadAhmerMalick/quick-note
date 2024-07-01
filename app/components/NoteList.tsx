import Image from 'next/image'

import { classnames } from '@/utils'
import { GetNotesActionReutrn } from '@/actions/getNotesAction'

interface NoteListProp {
  note: GetNotesActionReutrn
}

const NoteList = ({ note }: NoteListProp) => {
  return (
    <div
      className={classnames(
        'w-full',
        'p-5',
        'bg-white rounded-lg shadow dark:border md:mt-0 dark:bg-neutral-850 dark:border-neutral-800'
      )}
      key={note.id}
    >
      <div
        className={classnames(
          'grid gap-5',
          note.files?.length ? 'grid-cols-[auto_100px]' : 'grid-cols-1'
        )}
      >
        <div>
          <h5
            className={classnames(
              'font-bold text-gray-900 dark:text-neutral-200 line-clamp-2',
              'line-clamp-2 overflow-hidden',
              'mb-2'
            )}
          >
            {note.title}
          </h5>
          <p
            className={classnames(
              'text-sm font-normal text-gray-700 dark:text-gray-400',
              'line-clamp-3 overflow-hidden'
            )}
          >
            {note.description}
          </p>
        </div>
        {!!note.files?.length && (
          <Image
            width={100}
            height={100}
            className="object-contain"
            src={note.files?.[0].link}
            alt={note.title}
          />
        )}
      </div>
    </div>
  )
}

export default NoteList
