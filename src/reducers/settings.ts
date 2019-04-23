import { CHANGE_DISPLAY_TYPE } from '../actions/settings'
import { DisplayType } from '../services/display/DisplayType'
import { createSelector } from 'reselect'
import { StateType } from './index'
import DisplayFactory from '../services/display/DisplayFactory'

type SettingsState = {
  displayType: DisplayType
}

const initialState: SettingsState = {
  displayType: DisplayType.VIBRATION
}

const settings = (state = initialState, action): SettingsState => {
  switch (action.type) {
    case CHANGE_DISPLAY_TYPE:
      return {
        ...state,
        displayType: action.displayType
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
