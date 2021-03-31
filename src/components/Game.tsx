import React, { useState } from 'react'
import Board from './Board'

//component
const Game = () => {
  const initialBoard = ['', '', '', '', '', '', '', '', '']
  const [gameHistory, setGameHistory] = useState<GameState[]>([initialBoard])

  /**
   * pointer function for handling click events from square component
   * adds current board state to history[] state
   * @param squares
   */
  const addGameHistory = (squares: string[], sliderValue: number) => {
    /**
     * clear the rest of history if the current game state is at a
     * previous state in history and a new move is made
     */
    setGameHistory([...gameHistory.slice(0, sliderValue + 1), squares])
  }

  return (
    <div>
      <Board gameHistory={gameHistory} addGameHistory={addGameHistory} />
    </div>
  )
}

export default Game
