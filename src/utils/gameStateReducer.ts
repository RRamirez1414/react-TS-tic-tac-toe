const gameStateReducer = (state: GameState, action: string) => {
  console.log('reducer called! Action:' + action)

  switch (action) {
    case 'restart':
      return {
        currentBoardState: ['', '', '', '', '', '', '', '', ''],
        isWon: false,
        isTied: false,
        isXNext: true,
        winningSquareSet: [],
        sliderValue: 0,
      }

    default:
      return state
  }
}

export default gameStateReducer
