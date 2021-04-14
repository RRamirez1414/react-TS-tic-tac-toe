import React, { useEffect, useReducer } from 'react'
import Square from './Square'
import Confetti from 'react-dom-confetti'
import confettiConfig from './confetti-config'
import { gameStateReducer, initialState, checkWinner, checkIsTied, checkIsWinningSquare } from 'utils'

const Board = () => {
  const [gameState, dispatch] = useReducer(gameStateReducer, initialState)

  useEffect(() => {
    const isWinningSquareSet = checkWinner(gameState.currentBoardState)

    if (isWinningSquareSet) {
      dispatch({
        type: 'PLAYER_WON',
        newGameState: { ...gameState, winningSquareSet: isWinningSquareSet },
      })
    } else if (checkIsTied(gameState.currentBoardState) && !gameState.isWon) {
      dispatch({ type: 'TIE', newGameState: gameState })
    } 

  }, [gameState.currentBoardState])

  return (
    <div>
      <div className="status">
        <h2>{'Next Player: ' + (gameState.buttonValue === 0 ? 'X' : (gameState.buttonValue % 2 === 0 ? 'X' : 'O'))}</h2>
      </div>
      <div className="button-container">
        {gameState.gameHistory.filter((_, i) => i !== 0).map((_, index) => {
            return (
              <button
                key={index}
                className="history-button"
                onClick={() => {
                  dispatch({
                    type: 'JUMP_TO_HISTORY',
                    newGameState: {...gameState, buttonValue: index}
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
            dispatch({ type: 'RESTART', newGameState: gameState })
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
                  disabled={(squareLetter ? true : false) || gameState.isWon}
                  isHighlighted={checkIsWinningSquare(
                    gameState.winningSquareSet,
                    index
                  )}
                  gameState={gameState}
                  dispatch={dispatch}
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
