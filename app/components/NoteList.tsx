import Image from 'next/image'
import { toast } from 'react-toastify'
import type { MouseEvent, MouseEventHandler } from 'react'

import {
  AiOutlineSaveIcon,
  AiOutlineCopyIcon,
  AiOutlineDeleteIcon,
} from '@/components/icons'
import { classnames } from '@/utils'
import useLinkify from '@/hooks/useLinkify'
import IconButton from '@/components/IconButton'
import { GetNotesActionReutrn } from '@/actions/getNotesAction'

interface NoteListProp {
  note: GetNotesActionReutrn
  onDeleteNote(id: string): void
  onRestoreNote(id: string): void
  onSoftDeleteNote(id: string): void
  onClick: MouseEventHandler<HTMLDivElement> | undefined
}

const NoteList = ({
  note,
  onClick,
  onDeleteNote,
  onRestoreNote,
  onSoftDeleteNote,
}: NoteListProp) => {
  const onSoftDelete = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation()
    onSoftDeleteNote(note.id)
  }

  const onRestore = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation()
    onRestoreNote(note.id)
  }

  const onDelete = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.stopPropagation()
    onDeleteNote(note.id)
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
        'p-3 md:p-4',
        'rounded-lg bg-white shadow md:mt-0 dark:bg-neutral-850',
        'border border-transparent duration-100 hover:border-primary hover:bg-white hover:ring-1 hover:ring-yellow-200 hover:dark:bg-neutral-850 hover:dark:ring-yellow-950'
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
              'line-clamp-2 font-semibold text-neutral-900 dark:text-neutral-200',
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
            dangerouslySetInnerHTML={{ __html: useLinkify(note.description) }}
          />
        </div>
        {!!note.files?.length && (
          <Image
            width={100}
            height={100}
            alt={note.title}
            className="rounded-md object-contain"
            overrideSrc="./image-placeholder.svg"
            src={note.files?.[0].link || './image-placeholder.svg'}
          />
        )}
        <div className="flex flex-col justify-end gap-2">
          {!note.deletedAt ? (
            <IconButton
              onClick={onSoftDelete}
              className="border-orange-600 !bg-orange-400 !p-1 dark:border-orange-600 dark:bg-orange-500"
            >
              <AiOutlineDeleteIcon />
            </IconButton>
          ) : (
            <>
              <IconButton
                onClick={onRestore}
                className="border-green-600 !bg-green-400 !p-1 dark:border-green-600 dark:bg-green-500"
              >
                <AiOutlineSaveIcon />
              </IconButton>
              <IconButton
                onClick={onDelete}
                className="border-red-600 !bg-red-400 !p-1 dark:border-red-600 dark:bg-red-500"
              >
                <AiOutlineDeleteIcon />
              </IconButton>
            </>
          )}
          <IconButton
            onClick={copyDescriptionToClipboard}
            className="border-yellow-600 !bg-yellow-400 !p-1 dark:border-yellow-600 dark:bg-yellow-500"
          >
            <AiOutlineCopyIcon />
          </IconButton>
        </div>
      </div>
    </div>
  )
}

export default NoteList
