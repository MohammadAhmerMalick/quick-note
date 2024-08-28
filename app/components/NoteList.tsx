import Image from 'next/image'
import { type MouseEventHandler } from 'react'

import { classnames } from '@/utils'
import { GetNotesActionReutrn } from '@/actions/getNotesAction'
import { AiOutlineDeleteIcon, AiOutlineSaveIcon } from '@/components/icons'

interface NoteListProp {
  note: GetNotesActionReutrn
  deleteNote(id: string): void
  restoreNote(id: string): void
  onClick: MouseEventHandler<HTMLDivElement> | undefined
}

const NoteList = ({ note, deleteNote, restoreNote, onClick }: NoteListProp) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={undefined}
      className={classnames(
        'w-full',
        'md:p-4 p-3',
        'bg-white rounded-lg shadow md:mt-0 dark:bg-neutral-850',
        'border border-transparent hover:border-yellow-500 hover:ring-yellow-200 hover:dark:ring-yellow-950 hover:ring-1 hover:bg-white hover:dark:bg-neutral-850'
      )}
      key={note.id}
    >
      <div
        className={classnames(
          'grid gap-1',
          note.files?.length
            ? 'grid-cols-[auto_100px_26px]'
            : 'grid-cols-[auto_26px]'
        )}
      >
        <div className="overflow-hidden">
          <h5
            className={classnames(
              'font-semibold text-neutral-900 dark:text-neutral-200 line-clamp-2 ',
              'line-clamp-2 overflow-hidden',
              'mb-2'
            )}
          >
            {note.title}
          </h5>
          <p
            className={classnames(
              'text-sm font-normal text-neutral-800 dark:text-neutral-300',
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
            className="object-contain rounded-md"
            src={note.files?.[0].link}
            alt={note.title}
          />
        )}
        <div className="flex flex-col justify-end">
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
    </div>
  )
}

export default NoteList
