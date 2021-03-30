import React, { useState, useEffect } from 'react'
import Square from './Square'
import { checkWinner } from '../utils'
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
  const [sliderValue, setSliderValue] = useState<number>(0)

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
   * reset some states when restart button is clicked
   * TODO: move this function to onClick inline?
   */
  const restart = () => {
    setGameState(gameHistory[0])
    setIsWinner(false)
    setWinningSquares([])
  }

  /**
   * based on the range value, sets the game to history[n]
   * @param historyIndex
   */
  const jumpToGameHistory = (historyIndex: number) => {
    setGameState(gameHistory[historyIndex])
  }

  return (
    <div>
      <div className="slider-container">
        {/**
         * TODO: fix range input so that the current value goes up
         * as you make moves but can slide up and down
         */}
        <input
          type="range"
          min={0}
          max={gameHistory.length - 1}
          step={1}
          value={sliderValue} //reduntant, must dynamically go up based on history length
          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => {
            const sliderValue = parseInt(ev.target.value)
            setSliderValue(sliderValue)
            jumpToGameHistory(sliderValue)
            setWinningSquares([])
            setIsWinner(false)
          }}
        ></input>
      </div>
      <div className="winner-title">
        <h2>{isWinner ? 'Winner! ' + gameState[winningSquares[0]] : ''}</h2>
      </div>
      <div className="reset">
        <button
          hidden={!isWinner ? true : false}
          disabled={!isWinner}
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
            {gameState.map((squareValue, index) => {
              return (
                <Square
                  key={index}
                  id={index}
                  currentTurn={currentTurn}
                  value={squareValue}
                  disabled={squareValue ? true : false}
                  winningSquares={isWinner ? winningSquares : []}
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

export default Board
