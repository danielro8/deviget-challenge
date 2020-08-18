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
} from './types'

export const toggle = (flagged) => {
  return {
    type: TOGGLE_FLAG,
    payload: { flagged }
  }
}

export const init = () => {
  return { type: INIT }
}

export const game_over = (params) => {
  return { type: GAME_OVER, payload: params }
}

export const clear = () => {
  return { type: CLEAR }
}

export const save = () => {
  return { type: SAVE }
}

export const resume = () => {
  return { type: RESUME }
}

export const start_game = (params) => {
  return { type: START_GAME, payload: params }
}

export const cell_click = (params) => {
  return { type: CELL_CLICK, payload: params }
}
export const update_timer = (params) => {
  return { type: UPDATE_TIMER, payload: params }
}
export const login = (params) => {
  return { type: LOGIN, payload: params }
}
export const logout = (params) => {
  return { type: LOGOUT, payload: params }
}
export const get_user = (params) => {
  return { type: GET_USER, payload: params }
}