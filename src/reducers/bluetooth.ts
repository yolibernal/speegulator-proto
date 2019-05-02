import { ADD_DEVICE, SELECT_DEVICE } from '../actions/bluetooth'

type BluetoothState = {
  devices: any[]
  selectedDevice: string
}

// TODO: device type
const initialState: BluetoothState = {
  devices: [],
  selectedDevice: 'C9:B7:CB:3F:F6:CB'
}

const bluetooth = (state = initialState, action): BluetoothState => {
  switch (action.type) {
    case ADD_DEVICE:
      const foundDevice = action.device
      const otherDevices = state.devices.filter(device => device.id !== foundDevice.id)
      const idComparator = (d1, d2) => {
        if (d1.id < d2.id) return -1
        if (d1.id === d2.id) return 0
        return 1
      }
      const devices = [...otherDevices, foundDevice].sort(idComparator)
      return {
        ...state,
        devices
      }
    case SELECT_DEVICE:
      const deviceId = action.deviceId
      return {
        ...state,
        selectedDevice: deviceId
      }
    default:
      return state
  }
}

export default bluetooth
