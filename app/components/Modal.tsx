import {
  Dialog,
  ModalOverlay,
  DialogTrigger,
  Modal as AriaModal,
} from 'react-aria-components'
import Image from 'next/image'

import {
  AiOutlineCopyIcon,
  AiOutlineSaveIcon,
  AiOutlineCloseIcon,
  AiOutlineDeleteIcon,
} from '@/components/icons'
import { classnames } from '@/utils'
import useLinkify from '@/hooks/useLinkify'
import IconButton from '@/components/IconButton'
import { GetNotesActionReutrn } from '@/actions/getNotesAction'

interface ModalProp {
  onClose(): any
  isOpen: boolean
  restoreNote(id: string): void
  softDeleteNote(id: string): void
  note: GetNotesActionReutrn | null
}

const Modal = ({
  note,
  isOpen,
  onClose,
  restoreNote,
  softDeleteNote,
}: ModalProp) => {
  const description = useLinkify(note?.description)
  if (!note) return <span />

  return (
    <ModalOverlay
      isDismissable
      isOpen={isOpen}
      onOpenChange={onClose}
      className={({ defaultClassName }) =>
        classnames(
          defaultClassName,
          'fixed bottom-0 left-0 right-0 top-0 z-50 grid h-full w-full place-items-center items-center justify-center bg-neutral-50/40 p-3 backdrop-blur-sm md:p-4 dark:bg-neutral-950/40'
        )
      }
    >
      <DialogTrigger>
        <AriaModal className="grid max-h-full grid-rows-1 overflow-hidden rounded-lg bg-white p-3 pr-1 shadow md:mt-0 md:p-5 md:pr-2 dark:bg-neutral-850">
          <Dialog className="overflow-auto pr-2">
            <h5 className="border-b border-neutral-200 pb-4 font-semibold text-neutral-900 dark:border-neutral-600 dark:text-neutral-200">
              {note.title}
            </h5>
            <div
              className={classnames(
                'gap-2 py-4 md:gap-6',
                note.files.length && note.description && 'flex'
              )}
            >
              <p
                className="whitespace-pre-line text-sm font-normal text-neutral-800 dark:text-neutral-300"
                dangerouslySetInnerHTML={{ __html: description }}
              />
              {!!note.files?.length && (
                <Image
                  width={1000}
                  height={1000}
                  alt={note.title}
                  overrideSrc="./image-placeholder.svg"
                  src={note.files?.[0].link || './image-placeholder.svg'}
                  className="h-full max-h-[400px] w-min rounded-md object-contain"
                />
              )}
            </div>

            <div className="flex items-center justify-end gap-2 border-t border-neutral-200 pt-4 dark:border-neutral-600">
              {!note.deletedAt ? (
                <IconButton
                  onClick={() => softDeleteNote(note.id)}
                  className="flex items-center justify-center gap-1 !border-red-900 !bg-red-600 !p-1 !pr-2 text-white"
                >
                  <AiOutlineDeleteIcon /> <span>Delete</span>
                </IconButton>
              ) : (
                <IconButton
                  onClick={() => restoreNote(note.id)}
                  className="flex items-center justify-center gap-1 !border-green-900 !bg-green-500 !p-1 !pr-2"
                >
                  <AiOutlineSaveIcon /> <span>Restore</span>
                </IconButton>
              )}

              <IconButton
                onClick={() => navigator.clipboard.writeText(note.description)}
                className="flex items-center justify-center gap-1 !border-yellow-900 !bg-primary !p-1 !pr-2"
              >
                <AiOutlineCopyIcon /> <span>Copy</span>
              </IconButton>

              <IconButton
                onClick={onClose}
                className="flex items-center justify-center gap-1 !border-gray-700 !bg-gray-400 !p-1 !pr-2"
              >
                <AiOutlineCloseIcon /> <span>Close</span>
              </IconButton>
            </div>
          </Dialog>
        </AriaModal>
      </DialogTrigger>
    </ModalOverlay>
  )
}

export default Modal
