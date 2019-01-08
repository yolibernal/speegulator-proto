export interface Display {
  /* TODO: maybe intensity parameter, could be
    * vibration duration for DeviceVibration
    * vibration intensity for HapticDisplay
    * different command for VoiceCommand
  */
  displayDecreaseSpeed(): Promise<void>
  displayIncreaseSpeed(): Promise<void>
}
