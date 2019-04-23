import { CHANGE_DISPLAY_TYPE } from '../actions/settings'
import { DisplayType } from '../services/display/DisplayType'

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
