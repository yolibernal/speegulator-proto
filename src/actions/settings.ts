
export const UPDATE_DISPLAY_TYPE = 'UPDATE_DISPLAY_TYPE'

export enum DisplayType {
  DeviceVibration = 'DEVICE_VIBRATION',
  VoiceCommand = 'VOICE_COMMAND',
  Haptic = 'HAPTIC'
}

export const updateDisplayType = (displayType: DisplayType) => ({
  type: UPDATE_DISPLAY_TYPE,
  displayType
})
