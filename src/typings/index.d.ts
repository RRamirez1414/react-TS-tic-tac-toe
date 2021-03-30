/**
 * Typescript definition file, any type added here will be
 * available globally in this project
 */

//state of the of grid, keeps track of what tiles have 'X' or 'O' values
type GameState = string[]

//Square props
type SquareProps = {
  id: number
  currentTurn: string
  value: string
  disabled?: boolean
  winningSquares: number[]
  handleClick: (id: number, value: string) => void
}

//Board props
type BoardTypeProps = {
  gameHistory: GameState[]
  addGameHistory: (squares: GameState, sliderValue: number) => void
  currentTurn: string
}

//Restart props
type RestartProps = {
  render: boolean
  restart: () => void
}
