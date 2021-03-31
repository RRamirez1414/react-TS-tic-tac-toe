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
        isXNext: true,
        winningSquareSet: [],
        gameHistory: [initialBoard],
      }

    case 'UPDATE_CURRENT_BOARD':
      return {
        ...state,
        currentBoardState: newGameState.currentBoardState,
        buttonValue: state.buttonValue + 1,
      }

    case 'ADD_HISTORY':
      return {
        ...state,
        gameHistory: [
          ...state.gameHistory.slice(0, state.buttonValue),
          state.currentBoardState,
        ],
      }

    case 'SET_NEXT':
      return {
        ...state,
        isXNext: state.gameHistory.length % 2 === 0,
      }

    case 'SET_BUTTON_VALUE':
      return {
        ...state,
        buttonValue: newGameState.buttonValue,
      }

    case 'JUMP_TO_HISTORY': {
      return {
        ...state,
        isWon: false,
        isTied: false,
        isXNext: newGameState.isXNext,
        currentBoardState: state.gameHistory[state.buttonValue],
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

    case 'IN_PROGRESS':
      return {
        ...state,
        isXNext: newGameState.isXNext,
      }
    default:
      console.log('cannot complete action ' + type)
      return state
  }
}

export default gameStateReducer
