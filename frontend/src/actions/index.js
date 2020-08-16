import {
  TOGGLE_FLAG,
  INIT,
  GAME_OVER,
  CLEAR,
  RESUME,
  SAVE,
  START_GAME,
  CELL_CLICK
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

export const game_over = () => {
  return { type: GAME_OVER }
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