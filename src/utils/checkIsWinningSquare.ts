/**
 * function for checking if 'this' square is part of the set of
 * winning squares, sets the state to true if it is
 */
const checkIsHighlightedSquare = (squares: number[], id: number) => {
  if (squares.length < 3) {
    return false
  }

  return squares.some((winningSquareId) => id === winningSquareId)
}

export default checkIsHighlightedSquare
