import { initialBoard } from 'utils'

const gameStateReducer = (state: GameState, action: Action) => {
  const { type, newGameState } = action

  switch (type) {
    case 'RESTART':
      return {
        currentBoardState: initialBoard,
        sliderValue: 0,
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
        sliderValue: state.sliderValue + 1,
      }

    case 'ADD_HISTORY':
      return {
        ...state,
        gameHistory: [
          ...state.gameHistory.slice(0, state.sliderValue),
          state.currentBoardState,
        ],
      }

    case 'SET_NEXT':
      return {
        ...state,
        isXNext: state.gameHistory.length % 2 === 0,
      }

    case 'SET_SLIDER_VALUE':
      return {
        ...state,
        sliderValue: newGameState.sliderValue,
      }

    case 'JUMPTOHISTORY': {
      return {
        ...state,
        isWon: false,
        isTied: false,
        isXNext: newGameState.isXNext,
        currentBoardState: state.gameHistory[state.sliderValue],
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
