import React, { useState, useEffect } from 'react'

//component
const Square = ({
  id,
  currentTurn,
  value,
  disabled,
  winningSquares,
  handleClick,
}: SquareProps) => {
  const [stateValue, setValue] = useState<string>('')
  const [isWinningSquare, setIsWinningSquare] = useState<boolean>(false)

  /**
   * function for checking if 'this' square is part of the set of
   * winning squares, sets the state to true if it is
   */
  const checkIsWinningSquare = () => {
    winningSquares.forEach((winningSquareId) => {
      if (id === winningSquareId) setIsWinningSquare(true)
    })

    if (winningSquares.length < 3) {
      setIsWinningSquare(false)
    }
  }

  useEffect(() => {
    setValue(value)
    checkIsWinningSquare()
  })

  return (
    <button
      id={id.toString()}
      className="square"
      style={{
        backgroundColor: isWinningSquare
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
