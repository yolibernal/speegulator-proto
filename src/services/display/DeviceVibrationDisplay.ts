import { Display } from './Display'
import { Vibration } from 'react-native'

export class DeviceVibrationDisplay implements Display {

  constructor(private options : {patterns: { increase: number | number[], decrease: number | number[]}}) {
  }

  async displayDecreaseSpeed(): Promise<void> {
    Vibration.vibrate(this.options.patterns.decrease, false)
  }

  async displayIncreaseSpeed(): Promise<void> {
    Vibration.vibrate(this.options.patterns.increase, false)
  }
}
