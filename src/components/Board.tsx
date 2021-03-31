import React, { useEffect, useState, useReducer } from 'react'
import Square from './Square'
import Confetti from 'react-dom-confetti'
import confettiConfig from './confetti-config'
import {
  checkWinner,
  checkIsTied,
  checkIsHighlightedSquare,
  updateBoardState,
  gameStateReducer,
} from 'utils'

//Board props
type BoardTypeProps = {
  gameHistory: BoardState[]
  addGameHistory: (squares: BoardState, sliderValue: number) => void
}

//component, destructured props of type BoardTypeProps
const Board = ({ gameHistory, addGameHistory }: BoardTypeProps) => {
  /**
   * TODO: for testing purposes, remove later
   */
  // const copyGameState = {
  //   currentBoardState: ['', '', '', '', 'X', '', '', 'O', ''],
  //   isWon: true,
  //   isTied: false,
  //   isXNext: true,
  //   winningSquareSet: [0, 1, 2],
  //   sliderValue: 5,
  // }
  // const [tempGameState, dispatch] = useReducer(gameStateReducer, copyGameState)

  /**
   * TODO2: use useReducer to manage the object
   */
  const [gameState, setBoardState] = useState<GameState>({
    currentBoardState: gameHistory[0],
    isWon: false,
    isTied: false,
    isXNext: true,
    winningSquareSet: [],
    sliderValue: 0,
  })

  /**
   * Handles updating the sate of the board string array
   * given a value from a square component
   * @param id
   * @param value
   */
  const onSquareClick = (id: number, value: string) => {
    const newGameState = updateBoardState(
      gameState.currentBoardState,
      id,
      value
    )

    setBoardState((prevGameState) => {
      return {
        ...prevGameState,
        currentBoardState: newGameState,
        isXNext: gameHistory.length % 2 === 0,
        sliderValue: prevGameState.sliderValue + 1,
      }
    })

    addGameHistory(newGameState, gameState.sliderValue)
  }

  /**
   * based on the range value, sets the game to history[n]
   * @param historyIndex
   */
  const jumpToGameHistory = (historyIndex: number) => {
    setBoardState((prevGameState) => {
      return { ...prevGameState, currentBoardState: gameHistory[historyIndex] }
    })
  }

  /**
   * reset several states
   */
  const restart = () => {
    /**
     * Test useReducer first with restart function
     * expected outcome: object values will be reset to initial
     */
    dispatch('restart')
    //look at components debugger, tempGameState has changed, congrats!

    //reset game
    setBoardState((prevGameState) => {
      return {
        ...prevGameState,
        currentBoardState: gameHistory[0],
        isWon: false,
        isTied: false,
        winningSquareSet: [],
        sliderValue: 0,
      }
    })
  }

  useEffect(() => {
    const isWinningSquareSet = checkWinner(gameState.currentBoardState)

    if (isWinningSquareSet) {
      //one player won
      setBoardState((prevGameState) => {
        return {
          ...prevGameState,
          isWon: true,
          winningSquareSet: isWinningSquareSet,
        }
      })
    } else if (checkIsTied(gameState.currentBoardState) && !gameState.isWon) {
      //no one won, tied
      setBoardState((prevBoardState) => {
        return { ...prevBoardState, isWon: false, isTied: true }
      })
    } else {
      //in progress game
      setBoardState((prevBoardState) => {
        return {
          ...prevBoardState,
          isWon: false,
          isTied: false,
          isXNext: gameState.sliderValue % 2 === 0,
          winningSquareSet: [],
        }
      })
    }
  }, [
    gameState.currentBoardState,
    gameState.isWon,
    gameState.isTied,
    gameState.isXNext,
    gameState.sliderValue,
  ])

  return (
    <div>
      <div className="status">
        <h2>{'Next Player: ' + (gameState.isXNext ? 'X' : 'O')}</h2>
      </div>
      {/**
       * TODO3: replace slider with button list
       * make a container for these buttons that fits the width
       * of the board
       */}
      <div className="slider-container">
        <input
          type="range"
          min={0}
          max={gameHistory.length - 1}
          step={1}
          value={gameState.sliderValue}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => {
            const sliderValue = parseInt(ev.target.value)
            jumpToGameHistory(sliderValue)
            //set isWon to false
            setBoardState((prevBoardState) => {
              return {
                ...prevBoardState,
                isWon: false,
                sliderValue: sliderValue,
              }
            })
          }}
        ></input>
      </div>
      <div className="winner-title">
        <h2>
          {gameState.isWon
            ? 'Winner! ' +
              gameState.currentBoardState[gameState.winningSquareSet[0]]
            : ''}
        </h2>
        <h2>{gameState.isTied && !gameState.isWon ? 'Tied!' : ''}</h2>
      </div>
      <div className="reset">
        <button
          hidden={!(gameState.isTied || gameState.isWon)}
          onClick={(): void => {
            restart()
          }}
        >
          Restart?
        </button>
      </div>
      <div className="confetti-container">
        <Confetti active={gameState.isWon} config={confettiConfig} />
      </div>
      <div className="board">
        <div className="container">
          <div className="board-grid">
            {gameState.currentBoardState.map((squareLetter, index) => {
              return (
                <Square
                  key={index}
                  id={index}
                  isXNext={gameState.isXNext}
                  squareLetter={squareLetter}
                  disabled={(squareLetter ? true : false) || gameState.isWon}
                  isHighlighted={checkIsHighlightedSquare(
                    gameState.winningSquareSet,
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
