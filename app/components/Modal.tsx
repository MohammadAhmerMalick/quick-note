import React from 'react'

import { classnames } from '@/utils'
import { GetNotesActionReutrn } from '@/actions/getNotesAction'

interface ModalProp {
  note: GetNotesActionReutrn
  deleteNote(id: string): void
  restoreNote(id: string): void
  onClose(): any
}

const Modal = ({ note, deleteNote, restoreNote, onClose }: ModalProp) => {
  return (
    <div
      tabIndex={-1}
      className="overflow-auto fixed top-0 bottom-0 right-0 left-0 z-50 justify-center items-center w-full h-full grid place-items-center backdrop-blur-sm md:p-4 p-3 bg-neutral-50/40 dark:bg-neutral-950/40"
    >
      <div
        className={classnames(
          'w-full',
          'md:p-5 p-3',
          'bg-white/10 rounded-lg shadow md:mt-0 dark:bg-neutral-850',
          'border border-transparent'
        )}
      >
        <div className="flex items-center justify-between border-b rounded-t dark:border-gray-600">
          <h5
            className={classnames(
              'font-semibold text-neutral-900 dark:text-neutral-200 line-clamp-2 ',
              'line-clamp-2 overflow-hidden',
              'mb-4'
            )}
          >
            {note.title}
          </h5>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <p
          className={classnames(
            'text-sm font-normal text-neutral-800 dark:text-neutral-300',
            'py-4'
          )}
        >
          {note.description}
        </p>
        <div className="flex items-center py-4 border-t border-gray-200 rounded-b dark:border-gray-600">
          <button
            onClick={onClose}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
