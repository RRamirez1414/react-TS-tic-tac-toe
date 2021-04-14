import { initialBoard } from 'utils'

const gameStateReducer = (state: GameState, action: Action) => {
  const { type, newGameState } = action

  switch (type) {
    case 'RESTART':
      return {
        currentBoardState: initialBoard,
        buttonValue: 0,
        isWon: false,
        isTied: false,
        isXNext: false,
        winningSquareSet: [],
        gameHistory: [initialBoard],
      }

    case 'UPDATE_CURRENT_BOARD':
      return {
        ...state,
        currentBoardState: newGameState.currentBoardState,
        buttonValue: state.buttonValue + 1,
        isXNext: newGameState.buttonValue % 2 === 0,
        gameHistory: [
          ...state.gameHistory.slice(0, state.buttonValue + 1),
          newGameState.currentBoardState,
        ],
      }

    case 'JUMP_TO_HISTORY': {
      return {
        ...state,
        buttonValue: newGameState.buttonValue,
        isXNext: (newGameState.buttonValue === 0 ? false : state.buttonValue % 2 === 0),
        isWon: false,
        isTied: false,
        currentBoardState: state.gameHistory[newGameState.buttonValue],
        winningSquareSet: [],
      }
    }

    case 'PLAYER_WON':
      return {
        ...state,
        isWon: true,
        isTied: false,
        isXNext: newGameState.buttonValue % 2 === 0,
        winningSquareSet: newGameState.winningSquareSet,
      }

    case 'TIE':
      return {
        ...state,
        isWon: false,
        isTied: true,
        isXNext: newGameState.buttonValue % 2 === 0,
        winningSquareSet: [],
      }

    default:
      throw new Error(`Action ${type} doesnt exist is gameStateReducer`)
      return state
  }
}

export default gameStateReducer
