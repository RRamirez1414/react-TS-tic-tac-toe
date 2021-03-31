/**
 * function for checking if 'this' square is part of the set of
 * winning squares, sets the state to true if it is
 */
const checkIsHighlightedSquare = (squares: number[], id: number) => {
  let isHighlighted = false
  if (squares.length < 3) {
    return isHighlighted
  }
  squares.forEach((winningSquareId) => {
    if (id === winningSquareId) isHighlighted = true
  })

  return isHighlighted
}

export default checkIsHighlightedSquare
