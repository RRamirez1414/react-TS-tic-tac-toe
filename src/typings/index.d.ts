/**
 * Typescript definition file, any type added here will be
 * available globally in this project
 */

//type for state of the of grid, keeps track of what tiles have 'X' or 'O' values
type BoardState = string[]

//type for state of the game
type GameState = {
  currentBoardState: BoardState
  buttonValue: number
  isWon: boolean
  isTied: boolean
  isXNext: boolean
  winningSquareSet: number[]
  gameHistory: BoardState[]
}

//types for useReducer
type Action = {
  type: 'RESTART' | 'UPDATE_CURRENT_BOARD' | 'JUMP_TO_HISTORY' | 'PLAYER_WON' | 'TIE'
  newGameState: GameState
}