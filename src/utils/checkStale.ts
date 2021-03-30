/**
 * Check if the board has been filled but there is no winner
 * @param board
 */
const checkStale = (board: string[]) => {
  for (let i = 0; i < board.length; i++) {
    if (board[i] === '') {
      return false
    }
  }
  return true
}

export default checkStale
