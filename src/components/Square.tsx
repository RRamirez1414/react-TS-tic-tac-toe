import React, { useState, useEffect } from 'react'

//Square props
type SquareProps = {
  id: number
  currentTurn: string
  value: string
  disabled?: boolean
  isHighlighted: boolean
  handleClick: (id: number, value: string) => void
}

//component
const Square = ({
  id,
  currentTurn,
  value,
  disabled,
  isHighlighted,
  handleClick,
}: SquareProps) => {
  const [stateValue, setValue] = useState<string>('')

  useEffect(() => {
    setValue(value)
  }, [value])

  return (
    <button
      id={id.toString()}
      className="square"
      style={{
        backgroundColor: isHighlighted
          ? 'rgba(18, 194, 233, 1)'
          : 'rgba(0, 0, 0, 0)',
      }}
      onClick={() => {
        setValue(currentTurn)
        handleClick(id, currentTurn)
      }}
      disabled={disabled}
    >
      {stateValue}
    </button>
  )
}

export default Square
