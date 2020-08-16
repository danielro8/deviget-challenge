import {
  TOGGLE_FLAG,
  INIT,
  GAME_OVER,
  CLEAR,
  RESUME,
  SAVE,
  START_GAME,
  CELL_CLICK
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
        gameStarted: false, 
        clear: false,
        resume: false,
        save: false,
        bombCount: config.bombCount,
        rows: config.rows,
        cols: config.cols,
        map: [],
        cellsClicked: 1
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
    case START_GAME: {
      const { bombCount, rows, cols, map } = action.payload
      return Object.assign({}, state, { bombCount, rows, cols, map, gameStarted: true })
    }
    case CELL_CLICK: {
      let { cellsClicked } = action.payload
      return Object.assign({}, state, { cellsClicked: ++cellsClicked })
    }
    default: return state
  }
}

export default game
