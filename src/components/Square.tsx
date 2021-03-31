import React from 'react'

//Square props
type SquareProps = {
  id: number
  isXNext: boolean
  squareLetter: string
  disabled?: boolean
  isHighlighted: boolean
  onSquareClick: (id: number, value: string) => void
}

//component
const Square = ({
  id,
  isXNext,
  squareLetter,
  disabled,
  isHighlighted,
  onSquareClick,
}: SquareProps) => {
  return (
    <button
      id={id.toString()}
      className="square grow"
      style={{
        backgroundColor: isHighlighted
          ? 'rgba(18, 194, 233, 1)'
          : 'rgba(0, 0, 0, 0)',
      }}
      onClick={() => {
        onSquareClick(id, isXNext ? 'X' : 'O')
      }}
      disabled={disabled}
    >
      {squareLetter}
    </button>
  )
}

export default Square
