/**
 *
 * @param gameState
 * @param squareIndex
 * @param newValue
 * @returns
 */
const updateBoardState = (
  gameState: GameState,
  squareIndex: number,
  newValue: string
) => {
  const newGameState = gameState.map((square, index) => {
    if (squareIndex === index) return newValue
    return square
  })

  return newGameState
}

export default updateBoardState
