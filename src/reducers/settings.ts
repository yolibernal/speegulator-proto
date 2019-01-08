import { UPDATE_DISPLAY_TYPE, DisplayType } from '../actions/settings'
import { DeviceVibrationDisplay } from '../services/display/DeviceVibrationDisplay'
import configs from '../../configs'
import { VoiceCommandDisplay } from '../services/display/VoiceCommandDisplay'
import { Display } from '../services/display/Display'

const createDisplayForType = (displayType: (DisplayType | null)) => {
  switch (displayType) {
    case (DisplayType.DeviceVibration):
      return new DeviceVibrationDisplay(configs.display.vibrationDisplay)
    case (DisplayType.VoiceCommand):
      return new VoiceCommandDisplay(configs.display.voiceCommandDisplay)
    // TODO: Haptic Display case
    default:
      return new DeviceVibrationDisplay(configs.display.vibrationDisplay)
  }
}

type Settings = {
  displayType: DisplayType,
  display: Display
}

const initialState: Settings = {
  displayType: DisplayType.DeviceVibration,
  display: createDisplayForType(null)
}

const settings = (state = initialState, action): Settings => {
  switch (action.type) {
    case UPDATE_DISPLAY_TYPE:
      const display = createDisplayForType(action.displayType)
      return { ...state, displayType: action.displayType, display }
    default:
      return state
  }
}

export default settings
