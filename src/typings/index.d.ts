/**
 * Typescript definition file, any type added here will be
 * available globally in this project
 */

//type for state of the of grid, keeps track of what tiles have 'X' or 'O' values
type BoardState = string[]

//type for state of the game
type GameState = {
  currentBoardState: BoardState
  sliderValue: number
  isWon: boolean
  isTied: boolean
  isXNext: boolean
  winningSquareSet: number[]
  gameHistory: BoardState[]
}

//types for useReducer
type Action = {
  type: string
  newGameState: GameState
}

//types for useContext
type GameStateContext = {
  gameState: GameState
  stateDispatch: React.Dispatch<Action>
}
