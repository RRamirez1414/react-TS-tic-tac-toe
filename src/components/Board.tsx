import React, { useEffect, useContext } from 'react'
import Square from './Square'
import Confetti from 'react-dom-confetti'
import confettiConfig from './confetti-config'
import { GameStateContext } from './Game'
import { checkWinner, checkIsTied, checkIsHighlightedSquare } from 'utils'

//component, destructured props of type BoardTypeProps
const Board = () => {
  const { gameState, stateDispatch } = useContext(GameStateContext)

  useEffect(() => {
    const isWinningSquareSet = checkWinner(gameState.currentBoardState)

    if (isWinningSquareSet) {
      //one player won
      stateDispatch({
        type: 'PLAYER_WON',
        newGameState: { ...gameState, winningSquareSet: isWinningSquareSet },
      })
    } else if (checkIsTied(gameState.currentBoardState) && !gameState.isWon) {
      //no one won, tied
      stateDispatch({ type: 'TIE', newGameState: gameState })
    } else {
      //in progress game
      stateDispatch({
        type: 'IN_PROGRESS',
        newGameState: {
          ...gameState,
          isXNext: gameState.sliderValue % 2 === 0,
        },
      })
    }
  }, [gameState.currentBoardState, gameState.isXNext, gameState.sliderValue])

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
          max={gameState.gameHistory.length - 1}
          step={1}
          value={gameState.sliderValue}
          onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => {
            const sliderValue = parseInt(ev.target.value)
            stateDispatch({
              type: 'SET_SLIDER_VALUE',
              newGameState: {
                ...gameState,
                sliderValue: sliderValue,
              },
            })
            stateDispatch({
              type: 'JUMPTOHISTORY',
              newGameState: {
                ...gameState,
              },
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
            stateDispatch({ type: 'RESTART', newGameState: gameState })
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
