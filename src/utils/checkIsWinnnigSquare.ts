/**
 * function for checking if 'this' square is part of the set of
 * winning squares, sets the state to true if it is
 */
const checkIsWinningSquare = (squares: number[], id: number) => {
  let isWinningSquare = false
  if (squares.length < 3) {
    return isWinningSquare
  }
  squares.forEach((winningSquareId) => {
    if (id === winningSquareId) isWinningSquare = true
  })

  return isWinningSquare
}

export default checkIsWinningSquare
