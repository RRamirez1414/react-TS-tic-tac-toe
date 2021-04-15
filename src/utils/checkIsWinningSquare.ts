/**
 * function for checking if 'this' square is part of the set of
 * winning squares, returns true if it is
 * @param squares 
 * @param id 
 * @returns boolean
 */
const checkIsHighlightedSquare = (squares: number[], id: number) => {
  if (squares.length < 3) {
    return false
  }

  return squares.some((winningSquareId) => id === winningSquareId)
}

export default checkIsHighlightedSquare
