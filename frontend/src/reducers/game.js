import {
  TOGGLE_FLAG,
  INIT,
  GAME_OVER,
  CLEAR,
  RESUME,
  SAVE,
  START_GAME,
  CELL_CLICK,
  UPDATE_TIMER,
  LOGIN,
  LOGOUT,
  GET_USER
} from '../actions/types'
import config from '../config'
import { get } from 'mongoose';

const initialState = {
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
  timer: 20
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
      return Object.assign({}, state, {
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
        timer: 20
      })
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
      const { bombCount, rows, cols, map, playedMap, gameId } = action.payload
      return Object.assign({}, state, { bombCount, rows, cols, map, playedMap, gameId, gameStarted: true })
    }
    case CELL_CLICK: {
      let { cellsClicked } = action.payload
      return Object.assign({}, state, { cellsClicked: ++cellsClicked })
    }
    case UPDATE_TIMER: {
      let { timer } = action.payload
      return Object.assign({}, state, { timer: --timer })
    }
    case LOGIN: {
      const { user } = action.payload
      return Object.assign({}, state, { logged: true, user })
    }
    case LOGOUT: {
      const { user } = action.payload
      return Object.assign({}, state, { logged: false, user: undefined })
    }
    case GET_USER: {
      const { user } = action.payload
      return Object.assign({}, state, { user })
    }
    default: return state
  }
}

export default game
