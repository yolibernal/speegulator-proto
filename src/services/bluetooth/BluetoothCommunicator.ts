import { store } from '../../App'
import bleManager from './BleManager'

// TODO: check for bluetooth state (enabled?): https://github.com/Polidea/react-native-ble-plx/wiki/Bluetooth-Adapter-State
// TODO: handle onDeviceDisconnected?
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

  public async writeToWearable(writeValue: string) {
    try {
      const selectedDevice = store.getState().bluetooth.selectedDevice
      const deviceIsConnected = await bleManager.isDeviceConnected(selectedDevice)
      if (!deviceIsConnected) await this.connectToDevice(selectedDevice)

      // discovering of services has to be done before writing
      await bleManager.discoverAllServicesAndCharacteristicsForDevice(selectedDevice)

      const { serviceUuid: serviceUUID, characteristicUuid: characteristicUUID } = store.getState().settings
      const base64Value = writeValue

      await bleManager.writeCharacteristicWithResponseForDevice(
        selectedDevice,
        serviceUUID,
        characteristicUUID,
        base64Value
      )
    } catch (error) {
      console.warn('ERROR while trying write characteristic:', error)
    }
  }
}
