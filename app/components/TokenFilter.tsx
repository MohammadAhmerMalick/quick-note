import { useState, type Dispatch, type SetStateAction } from 'react'

import { classnames } from '@/utils'
import Button from '@/components/Button'
import IconButton from '@/components/IconButton'
import { BsTogglesIcon } from '@/components/icons'

interface TokenFilterProps {
  tokens:
    | {
        value: string
        isSelected: boolean
      }[]
    | undefined
  setTokens: Dispatch<
    SetStateAction<
      | {
          value: string
          isSelected: boolean
        }[]
      | undefined
    >
  >
}

const TokenFilter = ({ tokens, setTokens }: TokenFilterProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const handleTokenSelect = (value: string, isSelected: boolean) => {
    setTokens((oldState) =>
      oldState?.map((token) => {
        if (value === token.value) return { ...token, isSelected: !isSelected }
        return token
      })
    )
  }

  return (
    <div
      className={classnames(
        'overflow-y-auto mt-4',
        isExpanded ? 'h-40' : 'h-6'
      )}
    >
      <div className="flex gap-1 flex-wrap text-red-50 px-1">
        <Button
          className=" w-min !p-1"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <BsTogglesIcon />
        </Button>
        {tokens?.map(({ value, isSelected }) => (
          <IconButton
            key={value}
            ariaLabel={value}
            isActive={isSelected}
            className="px- !py-0 text-sm"
            onClick={() => handleTokenSelect(value, isSelected)}
          >
            {value}
          </IconButton>
        ))}
      </div>
    </div>
  )
}

export default TokenFilter
