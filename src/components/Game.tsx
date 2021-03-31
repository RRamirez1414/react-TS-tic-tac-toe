import React, { useReducer, createContext } from 'react'
import Board from './Board'
import { gameStateReducer, initialState } from 'utils'

export const GameStateContext = createContext<GameStateContext>({
  gameState: initialState,
  stateDispatch: () => null,
})

//component
const Game = () => {
  const [gameState, dispatch] = useReducer(gameStateReducer, initialState)

  return (
    <GameStateContext.Provider
      value={{ gameState: gameState, stateDispatch: dispatch }}
    >
      <div>
        <Board />
      </div>
    </GameStateContext.Provider>
  )
}

export default Game
