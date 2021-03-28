import React, { useState } from 'react'
import Board from './Board'

const Game: React.FC = () => {
  const initialBoard = ['', '', '', '', '', '', '', '', '']
  const [history, setHistory] = useState<string[][]>([initialBoard])
  const [isXNext, setIsXNext] = useState<boolean>(true)
  const [step, setStep] = useState<number>(0)
  const status = 'Next Player: ' + (isXNext ? 'X' : 'O')

  const historySet = history.map((set, index) => {
    return (
      <li key={index}>
        <button
          onClick={() => {
            jumpTo(index)
          }}
        >
          Go to move #{index}
        </button>
      </li>
    )
  })

  function jumpTo(n: number) {
    setIsXNext(n % 2 === 0)
    setStep(n)
    const newHist = history.slice(0, n + 1)
    setHistory(newHist)
  }

  function update(squares: string[]) {
    const updatedHist = [...history, squares]
    setHistory(updatedHist)
    setStep(updatedHist.length)
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
      <ul className="history-set">{historySet}</ul>
    </div>
  )
}

export default Game
