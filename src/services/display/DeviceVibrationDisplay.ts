import { Display } from './Display'
import { Vibration } from 'react-native'

type Options = {
  patterns: {
    speed: {
      increase: number | number[]
      decrease: number | number[]
    },
    maneuver: {
      left: number | number[]
      right: number | number[]
    }
  }
}
export class DeviceVibrationDisplay implements Display {

  constructor(private options: Options) {
  }

  async displayDecreaseSpeed(): Promise<void> {
    Vibration.vibrate(this.options.patterns.speed.decrease, false)
  }

  async displayIncreaseSpeed(): Promise<void> {
    Vibration.vibrate(this.options.patterns.speed.increase, false)
  }

  async maneuver(maneuverOptions) {
    const { modifier } = maneuverOptions
    if (modifier === 'left') Vibration.vibrate(this.options.patterns.maneuver.left, false)
    if (modifier === 'right') Vibration.vibrate(this.options.patterns.maneuver.right, false)
  }
}
