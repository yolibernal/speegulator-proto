import { Display } from './Display'
import BluetoothCommunicator from '../bluetooth/BluetoothCommunicator'
import { Buffer } from 'buffer'

// TODO: alternatively the display could import the store and dispatch vibration update actions
// => Bluetooth component listens

enum Motor {
  LEFT = 'LEFT',
  MIDDLE_LEFT = 'MIDDLE_LEFT',
  MIDDLE_RIGHT = 'MIDDLE_RIGHT',
  RIGHT = 'RIGHT'
}

type MotorActivity = {
  [motor in Motor]: boolean
}

export class WearableDisplay implements Display {

  private bluetoothCommunicator: BluetoothCommunicator
  private motorActive: MotorActivity

  constructor() {
    this.bluetoothCommunicator = new BluetoothCommunicator()
    this.motorActive = {
      [Motor.LEFT]: false,
      [Motor.MIDDLE_LEFT]: false,
      [Motor.MIDDLE_RIGHT]: false,
      [Motor.RIGHT]: false
    }
  }

  async displayDecreaseSpeed(): Promise<void> {
    await this.vibrateMotor(Motor.MIDDLE_LEFT)
  }

  async displayIncreaseSpeed(): Promise<void> {
    await this.vibrateMotor(Motor.MIDDLE_RIGHT)
  }

  async maneuver(maneuverOptions: { modifier: string }): Promise<void> {
    const { modifier } = maneuverOptions

    if (modifier === 'left') await this.vibrateMotor(Motor.LEFT)
    if (modifier === 'right') await this.vibrateMotor(Motor.RIGHT)
  }

  private async vibrateMotor(motor: Motor) {
    this.motorActive[motor] = true
    const writeValue = this.createWriteValue(this.motorActive)
    await this.bluetoothCommunicator.writeToWearable(writeValue)
    setTimeout(
      async () => {
        this.motorActive[motor] = false
        const writeValueAfter = this.createWriteValue(this.motorActive)
        await this.bluetoothCommunicator.writeToWearable(writeValueAfter)
      },
      1000
    )
  }

  private createWriteValue(motorActive: MotorActivity) {
    const chararacteristic = this.motorActiveToCharacteristic(motorActive)
    const base64Value = this.encodeBase64(chararacteristic)
    return base64Value
  }

  private encodeBase64(characteristic: string) {
    const encoded = Buffer.from(characteristic, 'hex').toString('base64')
    return encoded
  }

  private motorActiveToCharacteristic(motorActive: MotorActivity) {
    const booleanToHexBit = bool => bool ? 'ff' : '00'
    const { LEFT, MIDDLE_LEFT, MIDDLE_RIGHT, RIGHT } = motorActive
    const characteristic = [LEFT, MIDDLE_LEFT, MIDDLE_RIGHT, RIGHT]
      .map(booleanToHexBit)
      .join('')
    return characteristic
  }
}
