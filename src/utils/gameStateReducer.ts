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
        winningSquareSet: [],
        gameHistory: [initialBoard],
      }

    case 'UPDATE_CURRENT_BOARD':
      return {
        ...state,
        currentBoardState: newGameState.currentBoardState,
        buttonValue: newGameState.buttonValue,
        gameHistory: [
          ...state.gameHistory.slice(0, state.buttonValue + 1),
          newGameState.currentBoardState,
        ],
      }

    case 'JUMP_TO_HISTORY': {
      return {
        ...state,
        buttonValue: newGameState.buttonValue,
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
        winningSquareSet: newGameState.winningSquareSet,
      }

    case 'TIE':
      return {
        ...state,
        isWon: false,
        isTied: true,
        winningSquareSet: [],
      }

    default:
      throw new Error(`Action ${type} doesnt exist is gameStateReducer`)
  }
}

export default gameStateReducer
