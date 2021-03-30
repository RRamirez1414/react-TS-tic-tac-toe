import React, { useState } from 'react'
import Board from './Board'

//component
const Game = () => {
  const initialBoard = ['', '', '', '', '', '', '', '', '']
  const [gameHistory, setGameHistory] = useState<GameState[]>([initialBoard])
  const [isXNext, setIsXNext] = useState<boolean>(true)

  /**
   * pointer function for handling click events from square component
   * adds current board state to history[] state
   * @param squares
   */
  const addGameHistory = (squares: string[], sliderValue: number) => {
    setIsXNext(!isXNext)
    /**
     * clear the rest of history if the current game state is at a
     * previous state in history
     */
    //  setGameHistory([...gameHistory, squares])
    setGameHistory([...gameHistory.slice(0, sliderValue + 1), squares])
  }

  return (
    <div>
      <div className="status">
        <h2>{'Next Player: ' + (isXNext ? 'X' : 'O')}</h2>
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
