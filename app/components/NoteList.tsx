import Image from 'next/image'
import { toast } from 'react-toastify'
import type { MouseEvent, MouseEventHandler } from 'react'

import {
  AiOutlineSaveIcon,
  AiOutlineCopyIcon,
  AiOutlineDeleteIcon,
} from '@/components/icons'
import { classnames } from '@/utils'
import IconButton from '@/components/IconButton'
import { GetNotesActionReutrn } from '@/actions/getNotesAction'

interface NoteListProp {
  note: GetNotesActionReutrn
  deleteNote(id: string): void
  restoreNote(id: string): void
  onClick: MouseEventHandler<HTMLDivElement> | undefined
}

const NoteList = ({ note, deleteNote, restoreNote, onClick }: NoteListProp) => {
  const onDelete = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation()
    deleteNote(note.id)
  }

  const onRestore = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation()
    restoreNote(note.id)
  }

  const copyDescriptionToClipboard = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation()
    toast.info('copied')
    navigator.clipboard.writeText(note.description)
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={undefined}
      className={classnames(
        'w-full',
        'cursor-pointer',
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
        <div className="flex gap-2 flex-col justify-end">
          {!note.deletedAt ? (
            <IconButton
              onClick={onDelete}
              className="!p-1 !pr-2 !bg-red-600 !border-red-900 text-white"
            >
              <AiOutlineDeleteIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={onRestore}
              className="!p-1 !pr-2 !bg-green-500 !border-green-900"
            >
              <AiOutlineSaveIcon />
            </IconButton>
          )}
          <IconButton
            isActive
            onClick={copyDescriptionToClipboard}
            className="!p-1 !pr-2 !bg-yellow-500 !border-yellow-900"
          >
            <AiOutlineCopyIcon />
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default NoteList
