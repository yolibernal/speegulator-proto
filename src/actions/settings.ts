import { DisplayType } from '../services/display/DisplayType'

export const CHANGE_DISPLAY_TYPE = 'CHANGE_DISPLAY_TYPE'
export const changeDisplayType = (displayType: DisplayType) => ({
  type: CHANGE_DISPLAY_TYPE,
  displayType
})

export const SET_DESIRED_SPEED = 'SET_DESIRED_SPEED'
export const setDesiredSpeed = (desiredSpeed: number) => ({
  type: SET_DESIRED_SPEED,
  desiredSpeed
})

export const SET_DESIRED_SPEED_MARGIN = 'SET_DESIRED_SPEED_MARGIN'
export const setDesiredSpeedMargin = (desiredSpeedMargin: number) => ({
  type: SET_DESIRED_SPEED_MARGIN,
  desiredSpeedMargin
})
