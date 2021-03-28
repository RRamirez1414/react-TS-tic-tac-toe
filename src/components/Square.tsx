import React, { useState, useEffect } from 'react'

//Square props
type SquareProps = {
  id: number
  currTurn: string
  value: string
  disabled?: boolean
  handleClick: (id: number, value: string) => void
}

//component
const Square: React.FC<SquareProps> = (props: SquareProps) => {
  const [stateValue, setValue] = useState<string>('')

  /**
   * pointer function for updating state and calling 'handleClick'
   * from Board component, passing clicked square's id and X or O value
   * to track move history and rendering
   */
  function clickHandler() {
    const currValue = props.currTurn
    setValue(currValue)
    props.handleClick(props.id, currValue)
  }

  useEffect(() => {
    setValue(props.value)
  })

  return (
    <button className="square" onClick={clickHandler} disabled={props.disabled}>
      {stateValue}
    </button>
  )
}

export default Square
