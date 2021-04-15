/**
 * Check if the board has been filled but there is no winner
 * @param board
 */

const checkIsTied = (board: string[]) => {
  return board.every((square) => square !== '')
}

export default checkIsTied
