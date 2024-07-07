import type { Dispatch, SetStateAction } from 'react'
import IconButton from '@/components/IconButton'
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
      <IconButton
        ariaLabel={layout}
        onClick={() => setLayout('list')}
        isActive={layout === 'list'}
      >
        <AiOutlineOrderedListIcon />
      </IconButton>

      <IconButton
        ariaLabel={layout}
        onClick={() => setLayout('card')}
        isActive={layout === 'card'}
      >
        <AiOutlineCreditCardIcon />
      </IconButton>
    </div>
  )
}

export default NotesLayoutSelector
