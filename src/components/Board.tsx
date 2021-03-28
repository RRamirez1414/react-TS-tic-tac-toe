import React, { useState, useEffect } from 'react'
import Square from './Square'
import lines from './winning-conditions'

type BoardType = {
  squares: string[][]
  updateHistory: (squares: string[]) => void
  currTurn: string
}

const Board: React.FC<BoardType> = (props: BoardType) => {
  const [boardState, setBoardState] = useState<string[]>(props.squares[0])

  /**
   * Handles updating the sate of the board string array
   * given a value from a square component
   * @param id
   * @param value
   */
  function handleClick(id: number, value: string) {
    let newBoardState: string[] = []
    newBoardState = [...boardState]
    newBoardState[id] = value

    setBoardState(newBoardState)
    props.updateHistory(newBoardState)
  }

  /**
   * Handler for returning square components ready to be rendered
   * @param a
   * @returns Square components
   */
  function createSquares(a: string[]) {
    const squareComponents = a.map((item, index) => {
      return (
        <Square
          key={index}
          id={index}
          currTurn={props.currTurn}
          disabled={boardState[index] ? true : false}
          handleClick={handleClick}
        />
      )
    })

    return squareComponents
  }
  /**
   * Check for a winner on each click
   * @param a
   */
  function checkWinner(board: string[]) {
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        //return the value of a square itself to determine a winner
        return board[a]
      }
    }
  }

  /**
   * handle checking for winner after each board re-render
   */
  useEffect(() => {
    const winner = checkWinner(boardState)
    const elem = document.querySelector('.status') as HTMLElement

    if (winner) {
      elem.innerHTML = 'Winner! ' + winner
    }
  })

  return (
    <div className="board">
      <div className="container">
        <div className="board-grid">
          {createSquares(props.squares[props.squares.length - 1])}
        </div>
      </div>
    </div>
  )
}

export default Board
