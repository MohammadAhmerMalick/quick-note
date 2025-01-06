import { type MouseEvent } from 'react'

import {
  AiOutlineCopyIcon,
  AiOutlineSaveIcon,
  AiOutlineCloseIcon,
  AiOutlineDeleteIcon,
} from '@/components/icons'
import { classnames } from '@/utils'
import IconButton from '@/components/IconButton'
import { GetNotesActionReutrn } from '@/actions/getNotesAction'

interface ModalProp {
  onClose(): any
  note: GetNotesActionReutrn
  restoreNote(id: string): void
  softDeleteNote(id: string): void
}

const Modal = ({ note, softDeleteNote, restoreNote, onClose }: ModalProp) => {
  const onContainerClick = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => e.currentTarget === e.target && onClose()

  const onDelete = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    onClose()
    softDeleteNote(note.id)
  }

  const onRestore = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    onClose()
    restoreNote(note.id)
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onKeyDown={undefined}
      onClick={onContainerClick}
      className="fixed top-0 bottom-0 right-0 left-0 z-50 justify-center items-center w-full h-full grid place-items-center backdrop-blur-sm md:p-4 p-3 bg-neutral-50/40 dark:bg-neutral-950/40"
    >
      <div
        className={classnames(
          'grid max-h-full grid-rows-1',
          'overflow-hidden',
          'md:p-5 md:pr-2 p-3 pr-1',
          'bg-white rounded-lg shadow md:mt-0 dark:bg-neutral-850'
        )}
      >
        <div className="overflow-auto pr-2">
          <h5 className="font-semibold text-neutral-900 dark:text-neutral-200 border-b border-neutral-200 dark:border-neutral-600 pb-4">
            {note.title}
          </h5>
          <p
            className={classnames(
              'text-sm font-normal text-neutral-800 dark:text-neutral-300 whitespace-pre-line',
              'py-4'
            )}
          >
            {note.description}
          </p>
          <div className="flex gap-2 items-center justify-end pt-4 border-t border-neutral-200 dark:border-neutral-600">
            {!note.deletedAt ? (
              <IconButton
                onClick={onDelete}
                className="flex items-center justify-center gap-1 !p-1 !pr-2 !bg-red-600 !border-red-900 text-white"
              >
                <AiOutlineDeleteIcon /> <span>Delete</span>
              </IconButton>
            ) : (
              <IconButton
                onClick={onRestore}
                className="flex items-center justify-center gap-1 !p-1 !pr-2 !bg-green-500 !border-green-900"
              >
                <AiOutlineSaveIcon /> <span>Restore</span>
              </IconButton>
            )}

            <IconButton
              onClick={() => navigator.clipboard.writeText(note.description)}
              className="flex items-center justify-center gap-1 !p-1 !pr-2 !bg-yellow-500 !border-yellow-900"
            >
              <AiOutlineCopyIcon /> <span>Copy</span>
            </IconButton>

            <IconButton
              onClick={onClose}
              className="flex items-center justify-center gap-1 !p-1 !pr-2 !bg-gray-400  !border-gray-700"
            >
              <AiOutlineCloseIcon /> <span>Close</span>
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal
