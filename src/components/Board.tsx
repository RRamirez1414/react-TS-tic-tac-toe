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
  const [winningSquares, setWinningSquares] = useState<number[]>([])

  /**
   *
   * @param gameState
   * @param squareIndex
   * @param newValue
   * @returns
   */
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
    const possibleWinningSquares = checkWinner(newGameState)

    setGameState(newGameState)
    addGameHistory(newGameState)

    if (possibleWinningSquares) {
      setWinningSquares(possibleWinningSquares)
      setIsWinner(true)
    } else {
      setWinningSquares([])
      setIsWinner(false)
    }
  }

  /**
   * handle checking for winner after each board re-render
   */
  useEffect(() => {
    //reset board state to the last set of history sets
    setGameState(gameHistory[gameHistory.length - 1])
  })

  return (
    <div>
      <div className="winner-title">
        <h2>{isWinner ? 'Winner! ' + gameState[winningSquares[0]] : ''}</h2>
      </div>
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
            {gameState.map((squareValue, index) => {
              return (
                <Square
                  key={index}
                  id={index}
                  currentTurn={currentTurn}
                  value={squareValue}
                  disabled={squareValue ? true : false}
                  winningSquares={winningSquares}
                  handleClick={onSquareClick}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Check for a winner on each click
 * @param board
 */
const checkWinner = (board: string[]) => {
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      //return set of winning square ids
      return lines[i]
    }
  }
  return false
}

export default Board
