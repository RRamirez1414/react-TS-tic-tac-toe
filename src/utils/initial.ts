const initialBoard: BoardState = ['', '', '', '', '', '', '', '', '']

const initialState: GameState = {
  currentBoardState: initialBoard,
  sliderValue: 0,
  isWon: false,
  isTied: false,
  isXNext: true,
  winningSquareSet: [],
  gameHistory: [initialBoard],
}

export { initialBoard, initialState }
