import pino from 'pino'
import Logger from '../../Logger'
import { store } from '../../App'
import { BleManager } from 'react-native-ble-plx'

// TODO: move logic back to bluetooth react component?
// TODO: alternative create Higher Order Component withBluetoothConnection, that enables to write data?
export default class BluetoothCommunicator {

  private bleManager: BleManager
  private logger: pino.Logger

  constructor() {
    this.bleManager = new BleManager()
    this.logger = Logger.getLoggerForClass(this)
  }

  private async connectToDevice(deviceIdentifier: string): Promise<void> {
    try {
      await this.bleManager.connectToDevice(
        deviceIdentifier
      )
    } catch (error) {
      this.logger.warn('ERROR while connecting:', error)
    }
  }

  public writeToWearable() {
    // TODO: do
  }

  // TODO: ugly
  async sendTestVibrationToWearable(): Promise<any> {
    const selectedDevice = store.getState().bluetooth.selectedDevice
    await this.connectToDevice(selectedDevice)
    try {
      const selectedDevice = store.getState().bluetooth.selectedDevice
      // discovering of services needed
      await this.bleManager.discoverAllServicesAndCharacteristicsForDevice(selectedDevice)

      const serviceUUID = '713d0000-503e-4c75-ba94-3148f18d941e'
      const characteristicUUID = '713d0003-503e-4c75-ba94-3148f18d941e'
      const base64Value = '/////w=='

      await this.bleManager.writeCharacteristicWithResponseForDevice(
        selectedDevice,
        serviceUUID,
        characteristicUUID,
        base64Value
      )
    } catch (error) {
      this.logger.warn('ERROR while trying to vibrate wearable:', error)
    }
  }
}
