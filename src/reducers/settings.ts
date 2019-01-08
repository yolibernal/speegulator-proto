import { UPDATE_DISPLAY_TYPE, DisplayType } from '../actions/settings'

type Settings = {
  displayType: DisplayType
}

const initialState: Settings = {
  displayType: DisplayType.DeviceVibration
}

const settings = (state = initialState, action): Settings => {
  switch (action.type) {
    case UPDATE_DISPLAY_TYPE:
      return { ...state, displayType: action.displayType }
    default:
      return state
  }
}

export default settings
