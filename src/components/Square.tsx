import React, { useContext, useEffect } from 'react'
import { GameStateContext } from './Game'
import { updateBoardState } from 'utils'

//Square props
type SquareProps = {
  id: number
  isXNext: boolean
  squareLetter: string
  disabled?: boolean
  isHighlighted: boolean
}

//component
const Square = ({ id, isXNext, disabled, isHighlighted }: SquareProps) => {
  const { gameState, stateDispatch } = useContext(GameStateContext)

  //take care updating the game history update after render
  useEffect(() => {
    stateDispatch({ type: 'SET_NEXT', newGameState: gameState })
  }, [gameState.currentBoardState])

  return (
    <button
      id={id.toString()}
      className="square grow"
      style={{
        backgroundColor: isHighlighted
          ? 'rgba(18, 194, 233, 1)'
          : 'rgba(0, 0, 0, 0)',
      }}
      onClick={() => {
        //dispatch to let useContext handle updating the board
        stateDispatch({
          type: 'UPDATE_CURRENT_BOARD',
          newGameState: {
            ...gameState,
            currentBoardState: updateBoardState(
              gameState.currentBoardState,
              id,
              isXNext ? 'X' : 'O'
            ),
          },
        })
        stateDispatch({ type: 'ADD_HISTORY', newGameState: gameState })
      }}
      disabled={disabled}
    >
      {gameState.currentBoardState[id]}
    </button>
  )
}

export default Square
