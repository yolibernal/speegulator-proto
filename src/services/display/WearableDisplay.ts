import { Display } from './Display'
import BluetoothCommunicator from '../bluetooth/BluetoothCommunicator'

// TODO: alternatively the display could import the store and dispatch vibration update actions
// => Bluetooth component listens
export class VoiceCommandDisplay implements Display {

  private bluetoothCommunicator: BluetoothCommunicator

  constructor(private options) {

  }

  async displayDecreaseSpeed(): Promise<void> {
    // TODO: vibration pattern
    this.bluetoothCommunicator.writeToWearable()
  }

  async displayIncreaseSpeed(): Promise<void> {
    // TODO: vibration pattern
    this.bluetoothCommunicator.writeToWearable()
  }

}
