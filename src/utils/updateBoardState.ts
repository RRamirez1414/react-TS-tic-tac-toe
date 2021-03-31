/**
 *
 * @param gameState
 * @param squareIndex
 * @param newValue
 * @returns
 */
const updateBoardState = (
  boardState: BoardState,
  squareIndex: number,
  newValue: string
) => {
  const newGameState = boardState.map((square, index) => {
    if (squareIndex === index) return newValue
    return square
  })

  return newGameState
}

export default updateBoardState
