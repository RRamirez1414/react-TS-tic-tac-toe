import React, { useState, useEffect } from 'react'
import Square from './Square'
import lines from '../utils/winningConditions'
import Confetti from 'react-dom-confetti'
import confettiConfig from './confetti-config'

//component, destructured props of type BoardTypeProps
const Board = ({
  gameHistory,
  addGameHistory,
  currentTurn,
}: BoardTypeProps) => {
  const [gameState, setGameState] = useState<GameState>(gameHistory[0])
  const [isWinner, setIsWinner] = useState<boolean>(false)

  const updateBoardState = (
    gameState: GameState,
    squareIndex: number,
    newValue: string
  ) => {
    const newGameState = gameState.map((square, index) => {
      if (squareIndex === index) return newValue
      return square
    })

    return newGameState
  }

  /**
   * Handles updating the sate of the board string array
   * given a value from a square component
   * @param id
   * @param value
   */
  const onSquareClick = (id: number, value: string) => {
    const newGameState = updateBoardState(gameState, id, value)
    setGameState(newGameState)
    addGameHistory(newGameState)
  }

  /**
   * Check for a winner on each click
   * @param a
   */
  const checkWinner = (board: string[]) => {
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        //highlight winning squares
        document.getElementById(a.toString())?.classList.add('highlight')
        document.getElementById(b.toString())?.classList.add('highlight')
        document.getElementById(c.toString())?.classList.add('highlight')

        //return the value of a square itself to determine a winner
        return board[a]
      }
    }
  }

  /**
   * handle checking for winner after each board re-render
   */
  useEffect(() => {
    const winner = checkWinner(gameState)
    const elem = document.querySelector('.status') as HTMLElement

    if (winner) {
      elem.innerHTML = '<h2>Winner! ' + winner + '</h2>'
      setIsWinner(true)
    }

    //reset board state to the last set of history sets
    setGameState(gameHistory[gameHistory.length - 1])
  })

  return (
    <div>
      <div className="reset">
        <button
          hidden={!isWinner ? true : false}
          disabled={!isWinner}
          onClick={(): void => {
            window.location.reload()
          }}
        >
          Restart?
        </button>
      </div>
      <div className="confetti-container">
        <Confetti active={isWinner} config={confettiConfig} />
      </div>
      <div className="board">
        <div className="container">
          <div className="board-grid">
            {
              /* {createSquares(gameHistory[gameHistory.length - 1])} */
              gameState.map((item, index) => {
                return (
                  <Square
                    key={index}
                    id={index}
                    currentTurn={currentTurn}
                    value={gameHistory[gameHistory.length - 1][index]}
                    disabled={gameState[index] ? true : false}
                    handleClick={onSquareClick}
                  />
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Board
