import { winningConditions } from './'

/**
 * Check for a winner based on winning conditions
 * @param board
 */
export const checkWinner = (board: string[]) => {
  for (let i = 0; i < winningConditions.length; i++) {
    const [a, b, c] = winningConditions[i]
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      //return set of winning square ids
      return winningConditions[i]
    }
  }
  return false
}
