import Image from 'next/image'

import { classnames } from '@/utils'
import { GetNotesActionReutrn } from '@/actions/getNotesAction'
import { AiOutlineDeleteIcon, AiOutlineSaveIcon } from '@/components/icons'

interface NoteListProp {
  note: GetNotesActionReutrn
  deleteNote(id: string): void
  restoreNote(id: string): void
}

const NoteList = ({ note, deleteNote, restoreNote }: NoteListProp) => {
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
      <div className="text-right mt-2">
        {!note.deletedAt ? (
          <button
            aria-label="Delete Note"
            className="border-neutral-850 text-white border bg-red-300 dark:bg-red-600 p-1 rounded-md"
            onClick={() => deleteNote(note.id)}
          >
            <AiOutlineDeleteIcon />
          </button>
        ) : (
          <button
            aria-label="Restore Note"
            className={classnames(
              'p-1 shadow',
              ' rounded-md border-white dark:border-neutral-600 border',
              'bg-white dark:bg-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-600  focus:bg-neutral-100 dark:focus:bg-neutral-600'
            )}
            onClick={() => restoreNote(note.id)}
          >
            <AiOutlineSaveIcon />
          </button>
        )}
      </div>
    </div>
  )
}

export default NoteList
