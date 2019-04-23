import { CHANGE_DISPLAY_TYPE, SET_DESIRED_SPEED } from '../actions/settings'
import { DisplayType } from '../services/display/DisplayType'
import { createSelector } from 'reselect'
import { StateType } from './index'
import DisplayFactory from '../services/display/DisplayFactory'

type SettingsState = {
  displayType: DisplayType
  desiredSpeed: number
}

const initialState: SettingsState = {
  displayType: DisplayType.VIBRATION,
  desiredSpeed: 8
}

const settings = (state = initialState, action): SettingsState => {
  switch (action.type) {
    case CHANGE_DISPLAY_TYPE:
      return {
        ...state,
        displayType: action.displayType
      }
    case SET_DESIRED_SPEED:
      return {
        ...state,
        desiredSpeed: action.desiredSpeed
      }
    default:
      return state
  }
}

export default settings

export const getDisplayType = (state: StateType) => state.settings.displayType

export const getDisplay = createSelector(
  [getDisplayType],
  (displayType) => {
    const display = DisplayFactory.createDisplay(displayType)
    return display
  }
)
