
export const CHANGE_DISPLAY_TYPE = 'CHANGE_DISPLAY_TYPE'

export enum DisplayType {
  DeviceVibration = 'DEVICE_VIBRATION',
  VoiceCommand = 'VOICE_COMMAND',
  Haptic = 'HAPTIC'
}

export const changeDisplayType = (displayType: DisplayType) => ({
  type: CHANGE_DISPLAY_TYPE,
  displayType
})
