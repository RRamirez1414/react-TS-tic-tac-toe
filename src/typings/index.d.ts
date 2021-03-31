/**
 * Typescript definition file, any type added here will be
 * available globally in this project
 */

//type for state of the of grid, keeps track of what tiles have 'X' or 'O' values
type BoardState = string[]

//type for state of the game
type GameState = {
  currentBoardState: BoardState
  isWon: boolean
  isTied: boolean
  isXNext: boolean
  winningSquareSet: number[]
  sliderValue: number
}
