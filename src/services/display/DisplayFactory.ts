import { DisplayType } from './DisplayType'
import { DeviceVibrationDisplay } from './DeviceVibrationDisplay'
import { VoiceCommandDisplay } from './VoiceCommandDisplay'
import { WearableDisplay } from './WearableDisplay'
import configs from '../../../configs'

export default class DisplayFactory {
  static createDisplay(displayType: DisplayType) {
    switch (displayType) {
      case DisplayType.VIBRATION:
        return new DeviceVibrationDisplay(configs.display.vibrationDisplay)
      case DisplayType.VOICE:
        return new VoiceCommandDisplay(configs.display.voiceCommandDisplay)
      case DisplayType.WEARABLE:
        return new WearableDisplay(configs.display.wearableDisplay)
      default:
        return new DeviceVibrationDisplay(configs.display.vibrationDisplay)
    }
  }
}
