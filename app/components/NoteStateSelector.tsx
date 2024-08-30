import type { Dispatch, SetStateAction } from 'react'
import IconButton from '@/components/IconButton'
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
      <IconButton
        ariaLabel={selectedState}
        onClick={() => setSelectedState('notDeleted')}
        isActive={selectedState === 'notDeleted'}
      >
        <AiOutlineDatabaseIcon />
      </IconButton>

      <IconButton
        ariaLabel={selectedState}
        onClick={() => setSelectedState('deleted')}
        isActive={selectedState === 'deleted'}
        className="text-neutral-600 dark:text-neutral-50"
      >
        <AiOutlineDeleteIcon />
      </IconButton>
    </div>
  )
}

export default NoteStateSelector
