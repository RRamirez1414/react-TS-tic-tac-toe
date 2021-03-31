import React, { useEffect, useState } from 'react'
import Square from './Square'
import Confetti from 'react-dom-confetti'
import confettiConfig from './confetti-config'
import {
  checkWinner,
  checkIsTied,
  checkIsHighlightedSquare,
  updateBoardState,
} from 'utils'

//Board props
type BoardTypeProps = {
  gameHistory: GameState[]
  addGameHistory: (squares: GameState, sliderValue: number) => void
}

//component, destructured props of type BoardTypeProps
const Board = ({ gameHistory, addGameHistory }: BoardTypeProps) => {
  /**
   * TODO: make a gameState object object and use useReducer to manage it
   * Q: can states be tracked/change in this object through useReducer?
   */
  const [boardState, setBoardState] = useState<GameState>(gameHistory[0])
  const [isWinner, setIsWinner] = useState<boolean>(false)
  const [isTied, setIsTied] = useState<boolean>(false)
  const [winningSquares, setWinningSquares] = useState<number[]>([])
  const [sliderValue, setSliderValue] = useState<number>(0)
  const [isXNext, setIsXNext] = useState<boolean>(true)

  /**
   * Handles updating the sate of the board string array
   * given a value from a square component
   * @param id
   * @param value
   */
  const onSquareClick = (id: number, value: string) => {
    const newGameState = updateBoardState(boardState, id, value)

    setBoardState(newGameState)
    addGameHistory(newGameState, sliderValue)
    setSliderValue((previousValue) => {
      return previousValue + 1
    })
    setIsXNext(gameHistory.length % 2 === 0)
  }

  /**
   * based on the range value, sets the game to history[n]
   * @param historyIndex
   */
  const jumpToGameHistory = (historyIndex: number) => {
    setBoardState(gameHistory[historyIndex])
  }

  /**
   * reset several states
   */
  const restart = () => {
    setBoardState(gameHistory[0])
    setIsWinner(false)
    setWinningSquares([])
    setSliderValue(0)
    setIsTied(false)
  }

  useEffect(() => {
    const isGameWonSquares = checkWinner(boardState)
    setIsXNext(sliderValue % 2 === 0)

    if (isGameWonSquares) {
      setWinningSquares(isGameWonSquares)
      setIsWinner(true)
    } else if (checkIsTied(boardState) && !isWinner) {
      setIsTied(true)
      setIsWinner(false)
    } else {
      setWinningSquares([])
      setIsWinner(false)
      setIsTied(false)
    }
  }, [boardState, isWinner, isTied, sliderValue])

  return (
    <div>
      <div className="status">
        <h2>{'Next Player: ' + (isXNext ? 'X' : 'O')}</h2>
      </div>
      {/**
       * TODO: replace slider with button list
       * make a container for these buttons that fits the width
       * of the board
       */}
      <div className="slider-container">
        <input
          type="range"
          min={0}
          max={gameHistory.length - 1}
          step={1}
          value={sliderValue}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => {
            const sliderValue = parseInt(ev.target.value)
            setSliderValue(sliderValue)
            jumpToGameHistory(sliderValue)
            setIsWinner(false)
          }}
        ></input>
      </div>
      <div className="winner-title">
        <h2>{isWinner ? 'Winner! ' + boardState[winningSquares[0]] : ''}</h2>
        <h2>{isTied && !isWinner ? 'Tied!' : ''}</h2>
      </div>
      <div className="reset">
        <button
          hidden={!(isTied || isWinner)}
          onClick={(): void => {
            restart()
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
            {boardState.map((squareLetter, index) => {
              return (
                <Square
                  key={index}
                  id={index}
                  isXNext={isXNext}
                  squareLetter={squareLetter}
                  disabled={(squareLetter ? true : false) || isWinner}
                  isHighlighted={checkIsHighlightedSquare(
                    winningSquares,
                    index
                  )}
                  onSquareClick={onSquareClick}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Board
