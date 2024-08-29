import { type MouseEvent } from 'react'

import {
  AiOutlineSaveIcon,
  AiOutlineCloseIcon,
  AiOutlineDeleteIcon,
} from '@/components/icons'
import { classnames } from '@/utils'
import { GetNotesActionReutrn } from '@/actions/getNotesAction'
import IconButton from './IconButton'

interface ModalProp {
  note: GetNotesActionReutrn
  deleteNote(id: string): void
  restoreNote(id: string): void
  onClose(): any
}

const Modal = ({ note, deleteNote, restoreNote, onClose }: ModalProp) => {
  const onContainerClick = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => e.currentTarget === e.target && onClose()

  const onDelete = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    onClose()
    deleteNote(note.id)
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
          'bg-white rounded-lg shadow md:mt-0 dark:bg-neutral-850',
          'border border-transparent'
        )}
      >
        <div className="overflow-auto pr-2">
          <h5 className="font-semibold text-neutral-900 dark:text-neutral-200 border-b rounded-t dark:border-gray-600 pb-4">
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
          <div className="flex gap-2 items-center justify-end pt-4 border-t border-gray-200 rounded-b dark:border-gray-600">
            {!note.deletedAt ? (
              <button
                aria-label="Delete Note"
                className="border-red-500 dark:border-neutral-850 text-white border bg-red-600 p-1 pr-2 rounded-md shadow dark:shadow-transparent flex items-center justify-center gap-1"
                onClick={onDelete}
              >
                <AiOutlineDeleteIcon /> <span>Delete</span>
              </button>
            ) : (
              <IconButton
                onClick={onRestore}
                className="flex items-center justify-center gap-1 text-neutral-600 dark:text-neutral-50 !p-1 !pr-2"
              >
                <AiOutlineSaveIcon /> <span>Restore</span>
              </IconButton>
            )}

            <IconButton
              onClick={onClose}
              className="flex items-center justify-center gap-1 text-neutral-600 dark:text-neutral-50 !p-1 !pr-2"
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
