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
        playedMap: [],
        cellsClicked: 1,
        win: false,
        timer: 100,
        remainedTime: 100
      }
    }

    case GAME_OVER: {
      const { win } = action.payload
      return Object.assign({}, state, { gameover: true, win })
    }
    case CLEAR: {
      return Object.assign({}, state, { clear: true })
    }
    case SAVE: {
      const {playedMap, remainedTime } = action.payload
      return Object.assign({}, state, { save: true, playedMap, remainedTime })
    }
    case RESUME: {
      return Object.assign({}, state, { resume: true })
    }
    case START_GAME: {
      console.log('PAYLOAD', action.payload)
      const { bombCount, rows, cols, map, playedMap } = action.payload
      return Object.assign({}, state, { bombCount, rows, cols, map, playedMap, gameStarted: true })
    }
    case CELL_CLICK: {
      let { cellsClicked } = action.payload
      return Object.assign({}, state, { cellsClicked: ++cellsClicked })
    }
    default: return state
  }
}

export default game
