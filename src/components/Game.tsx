import React, { useState } from 'react'
import Board from './Board'

//component
const Game: React.FC = () => {
  const initialBoard = ['', '', '', '', '', '', '', '', '']
  const [history, setHistory] = useState<string[][]>([initialBoard])
  const [isXNext, setIsXNext] = useState<boolean>(true)
  const status = 'Next Player: ' + (isXNext ? 'X' : 'O')

  /**
   * based on the range value, sets the game to history[n]
   * @param n
   */
  function jumpTo(n: number) {
    setIsXNext(n % 2 === 0)
    const newHist = history.slice(0, n + 1)
    setHistory(newHist)
  }

  /**
   * pointer function for handling click events from square component
   * adds current board state to history[] state
   * @param squares
   */
  function update(squares: string[]) {
    const updatedHist = [...history, squares]
    setHistory(updatedHist)
    setIsXNext(!isXNext)
  }

  return (
    <div>
      <div className="status">
        <h2>{status}</h2>
      </div>
      <div className="slider">
        <input
          type="range"
          min={0}
          max={9}
          value={history.length - 1}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => {
            jumpTo(parseInt(ev.target.value))
          }}
        ></input>
      </div>
      <Board
        squares={history}
        updateHistory={update}
        currTurn={isXNext ? 'X' : 'O'}
      />
    </div>
  )
}

export default Game
