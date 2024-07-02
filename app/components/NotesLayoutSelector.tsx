import { classnames } from '@/utils'
import type { Dispatch, SetStateAction } from 'react'
import {
  AiOutlineCreditCardIcon,
  AiOutlineOrderedListIcon,
} from '@/components/icons'

const NotesLayoutSelector = ({
  layout = 'list',
  setLayout,
}: {
  layout: 'card' | 'list'
  setLayout: Dispatch<SetStateAction<'card' | 'list'>>
}) => {
  return (
    <div className="flex gap-1">
      <button
        aria-label="layout"
        onClick={() => setLayout('list')}
        className={classnames(
          layout === 'list'
            ? 'shadow border-transparent dark:border-neutral-700 bg-white dark:bg-neutral-800 z-10'
            : 'border-transparent',
          'md:p-2 p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:bg-neutral-100 dark:focus:bg-neutral-700 outline-0 rounded-md border text-ss'
        )}
      >
        <AiOutlineOrderedListIcon />
      </button>
      <button
        aria-label="layout"
        onClick={() => setLayout('card')}
        className={classnames(
          layout === 'card'
            ? 'shadow border-transparent dark:border-neutral-700 bg-white dark:bg-neutral-800 z-10'
            : 'border-transparent',
          'md:p-2 p-2 hover:bg-neutral-100 dark:hover:bg-neutral-700 focus:bg-neutral-100 dark:focus:bg-neutral-700 outline-0 rounded-md border text-ss'
        )}
      >
        <AiOutlineCreditCardIcon />
      </button>
    </div>
  )
}

export default NotesLayoutSelector
