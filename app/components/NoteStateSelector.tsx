import type { Dispatch, SetStateAction } from 'react'
import { classnames } from '@/utils'
import { AiOutlineDeleteIcon, AiOutlineDatabaseIcon } from '@/components/icons'

const NoteStateSelector = ({
  selectedState = 'notDeleted',
  setSelectedState,
}: {
  selectedState: 'stared' | 'notDeleted' | 'deleted'
  setSelectedState: Dispatch<
    SetStateAction<'stared' | 'notDeleted' | 'deleted'>
  >
}) => {
  return (
    <div className="flex gap-1">
      <button
        aria-label="Selected State"
        onClick={() => setSelectedState('notDeleted')}
        className={classnames(
          selectedState === 'notDeleted'
            ? 'shadow border-transparent dark:border-neutral-700 bg-white dark:bg-neutral-800 z-10'
            : 'border-transparent',
          'md:p-2 p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:bg-neutral-100 dark:focus:bg-neutral-700 outline-0 rounded-md border text-ss'
        )}
      >
        <AiOutlineDatabaseIcon />
      </button>
      <button
        aria-label="Selected State"
        onClick={() => setSelectedState('deleted')}
        className={classnames(
          selectedState === 'deleted'
            ? 'shadow border-transparent dark:border-neutral-700 bg-white dark:bg-neutral-800 z-10'
            : 'border-transparent',
          'md:p-2 p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:bg-neutral-100 dark:focus:bg-neutral-700 outline-0 rounded-md border text-ss'
        )}
      >
        <AiOutlineDeleteIcon />
      </button>
    </div>
  )
}

export default NoteStateSelector
