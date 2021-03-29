import React, { useState, useEffect } from 'react'

//component
const Square = ({
  id,
  currentTurn,
  value,
  disabled,
  handleClick,
}: SquareProps) => {
  const [stateValue, setValue] = useState<string>('')

  useEffect(() => {
    setValue(value)
  })

  return (
    <button
      id={id.toString()}
      className="square"
      onClick={() => {
        const currValue = currentTurn
        setValue(currValue)
        handleClick(id, currValue)
      }}
      disabled={disabled}
    >
      {stateValue}
    </button>
  )
}

export default Square
