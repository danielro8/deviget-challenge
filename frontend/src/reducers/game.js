import {
  TOGGLE_FLAG,
  INIT,
  GAME_OVER,
  CLEAR,
  RESUME,
  SAVE,
  GAME_PARAMS
} from '../actions/types'
import config from '../config'

const initialState = {
  gameover: false,
  clear: false,
  bombCount: config.bombCount,
  rows: config.rows,
  cols: config.cols
}

const game = (state = initialState, action) => {
  switch(action.type) {
    case TOGGLE_FLAG: {
      const { flagged } = action.payload
      let { bombCount } = state
      if (flagged) {
        bombCount -= 1
      } else {
        bombCount += 1
      }
      return Object.assign({}, state, { bombCount })
    }
    case INIT: {
      return {
        gameover: false,
        clear: false,
        resume: false,
        save: false,
        bombCount: config.bombCount,
        rows: config.rows,
        cols: config.cols
      }
    }

    case GAME_OVER: {
      return Object.assign({}, state, { gameover: true })
    }
    case CLEAR: {
      return Object.assign({}, state, { clear: true })
    }
    case SAVE: {
      return Object.assign({}, state, { save: true })
    }
    case RESUME: {
      return Object.assign({}, state, { resume: true })
    }
    case GAME_PARAMS: {
      const { bombCount, rows, cols } = action.payload
      return Object.assign({}, state, { bombCount, rows, cols })
    }
    default: return state
  }
}

export default game
