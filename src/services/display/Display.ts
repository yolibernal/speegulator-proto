// TODO: display as components?
export interface Display {
  /* TODO: maybe intensity parameter, could be
    * vibration duration for DeviceVibration
    * vibration intensity for WearableDisplay
    * different command for VoiceCommand
  */
  displayDecreaseSpeed(): Promise<void>
  displayIncreaseSpeed(): Promise<void>

  maneuver(options): Promise<void>
}
