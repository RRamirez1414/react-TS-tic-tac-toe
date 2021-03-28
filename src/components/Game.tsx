import React, { useState } from 'react'
import Board from './Board'

const Game: React.FC = () => {
  const initialBoard = ['', '', '', '', '', '', '', '', '']
  const [history, setHistory] = useState<string[][]>([initialBoard])
  const [isXNext, setIsXNext] = useState<boolean>(true)
  const status = 'Next Player: ' + (isXNext ? 'X' : 'O')

  function update(squares: string[]) {
    const updatedHist = [...history, squares]
    setHistory(updatedHist)
    setIsXNext(!isXNext)
  }

  return (
    <div>
      <div className="status">{status}</div>
      <Board
        squares={history}
        updateHistory={update}
        currTurn={isXNext ? 'X' : 'O'}
      />
    </div>
  )
}

export default Game
