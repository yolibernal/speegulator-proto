import { store } from '../../App'
import bleManager from './BleManager'

// TODO: move logic back to bluetooth react component?
// TODO: alternative create Higher Order Component withBluetoothConnection, that enables to write data?
export default class BluetoothCommunicator {

  private async connectToDevice(deviceIdentifier: string): Promise<void> {
    try {
      await bleManager.connectToDevice(
        deviceIdentifier
      )
    } catch (error) {
      console.warn('ERROR while connecting:', error)
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
      // discovering of services needed
      await bleManager.discoverAllServicesAndCharacteristicsForDevice(selectedDevice)

      const { serviceUuid: serviceUUID, characteristicUuid: characteristicUUID } = store.getState().settings
      const base64Value = '/////w=='

      await bleManager.writeCharacteristicWithResponseForDevice(
        selectedDevice,
        serviceUUID,
        characteristicUUID,
        base64Value
      )
    } catch (error) {
      console.warn('ERROR while trying to vibrate wearable:', error)
    }
  }
}
