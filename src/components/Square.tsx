import React, { useState, useEffect } from 'react'

//Square props
type SquareProps = {
  id: number
  currTurn: string
  disabled: boolean
  handleClick: (id: number, value: string) => void
}

const Square: React.FC<SquareProps> = (props: SquareProps) => {
  const [stateValue, setValue] = useState<string>('')

  const clickHandler = () => {
    const currValue = props.currTurn
    setValue(currValue)
    props.handleClick(props.id, currValue)
  }

  return (
    <button className="square" onClick={clickHandler} disabled={props.disabled}>
      {stateValue}
    </button>
  )
}

export default Square
