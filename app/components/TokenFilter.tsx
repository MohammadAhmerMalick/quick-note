import type { Dispatch, SetStateAction } from 'react'
import IconButton from './IconButton'

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
  const handleTokenSelect = (value: string, isSelected: boolean) => {
    setTokens((oldState) =>
      oldState?.map((token) => {
        if (value === token.value) return { ...token, isSelected: !isSelected }
        return token
      })
    )
  }

  return (
    <div className="flex gap-1 flex-wrap text-red-50 px-1 mt-4">
      {tokens?.map(({ value, isSelected }) => (
        <IconButton
          key={value}
          ariaLabel={value}
          isActive={isSelected}
          className="px-1 !py-0 text-sm"
          onClick={() => handleTokenSelect(value, isSelected)}
        >
          {value}
        </IconButton>
      ))}
    </div>
  )
}

export default TokenFilter
