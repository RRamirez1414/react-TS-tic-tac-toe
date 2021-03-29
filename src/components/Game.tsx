import React, { useState } from 'react'
import Board from './Board'

//component
const Game = () => {
  const initialBoard = ['', '', '', '', '', '', '', '', '']
  const [gameHistory, setGameHistory] = useState<GameState[]>([initialBoard])
  const [isXNext, setIsXNext] = useState<boolean>(true)

  /**
   * based on the range value, sets the game to history[n]
   * @param historyIndex
   */
  const jumpToGameHistory = (historyIndex: number) => {
    setIsXNext(historyIndex % 2 === 0)
    setGameHistory(gameHistory.slice(0, historyIndex + 1))
  }

  /**
   * pointer function for handling click events from square component
   * adds current board state to history[] state
   * @param squares
   */
  const addGameHistory = (squares: string[]) => {
    setGameHistory([...gameHistory, squares])
    setIsXNext(!isXNext)
  }

  return (
    <div>
      <div className="status">
        <h2>{'Next Player: ' + (isXNext ? 'X' : 'O')}</h2>
      </div>
      <div className="slider-container">
        <input
          type="range"
          min={0}
          max={9}
          value={gameHistory.length - 1}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => {
            jumpToGameHistory(parseInt(ev.target.value))
          }}
        ></input>
      </div>
      <Board
        gameHistory={gameHistory}
        addGameHistory={addGameHistory}
        currentTurn={isXNext ? 'X' : 'O'}
      />
    </div>
  )
}

export default Game
