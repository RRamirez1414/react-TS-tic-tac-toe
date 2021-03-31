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
          isXNext: gameState.buttonValue % 2 === 0,
        },
      })
    }
  }, [gameState.currentBoardState, gameState.isXNext, gameState.buttonValue])

  return (
    <div>
      <div className="status">
        <h2>{'Next Player: ' + (gameState.isXNext ? 'X' : 'O')}</h2>
      </div>
      <div className="button-container">
        {gameState.gameHistory.map((historySet, index) => {
          if (index > 0)
            return (
              <button
                key={index}
                className="history-button"
                onClick={() => {
                  stateDispatch({
                    type: 'SET_BUTTON_VALUE',
                    newGameState: { ...gameState, buttonValue: index },
                  })
                  stateDispatch({
                    type: 'JUMP_TO_HISTORY',
                    newGameState: gameState,
                  })
                }}
              >
                {index}
              </button>
            )
        })}
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
