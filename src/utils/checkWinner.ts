import winningConditions from './winningConditions'

/**
 * Check for a winner based on winning conditions
 * returns the set of square id's if found
 * @param board
 */
const checkWinner = (board: string[]): number[] | undefined => {
  return winningConditions.find(
    ([a, b, c]) => board[a] && board[a] === board[b] && board[a] === board[c]
  )
}

export default checkWinner
