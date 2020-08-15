import {
  TOGGLE_FLAG,
  INIT,
  GAME_OVER,
  CLEAR,
  RESUME,
  SAVE,
  GAME_PARAMS
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

export const gameover = () => {
  return { type: GAMEOVER }
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

export const game_params = () => {
  return { type: GAME_PARAMS }
}