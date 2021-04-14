import React from 'react'
import { updateBoardState } from 'utils'

//Square props
type SquareProps = {
  id: number
  disabled?: boolean
  isHighlighted: boolean
  gameState: GameState
  dispatch: React.Dispatch<Action>
}

//component
const Square = ({ id, disabled, isHighlighted, gameState, dispatch }: SquareProps) => {

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
        //dispatch to let useReducer handle updating the board
        dispatch({
          type: 'UPDATE_CURRENT_BOARD',
          newGameState: {
            ...gameState,
            currentBoardState: updateBoardState(
              gameState.currentBoardState,
              id,
              gameState.isXNext ? 'X' : 'O'
            ),
          },
        })
      }}
      disabled={disabled}
    >
      {gameState.currentBoardState[id]}
    </button>
  )
}

export default Square
