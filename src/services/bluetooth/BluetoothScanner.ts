import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { BleManager } from 'react-native-ble-plx'
import bleManager from './BleManager'
import { addDevice } from '../../actions/bluetooth'
import { StateType } from '../../reducers'

type Props = {
  selectedDevice,
  addDevice
}

type ComponentState = {}

class BluetoothScanner extends React.Component<Props, ComponentState> {

  render() {
    return null
  }

  componentDidMount() {
    this.startDeviceScan()
  }

  // async componentDidUpdate(prevProps) {
  //   if (prevProps.selectedDevice === this.props.selectedDevice) return
  //   await this.connectToDevice()
  // }

  private startDeviceScan() {
    bleManager.startDeviceScan(
      null,
      {},
      _.throttle(
        (error, device) => {
          if (error) console.error(error)
          this.props.addDevice(device)
        },
        500
      ))
  }
}

const mapStateToProps = (state: StateType) => ({ selectedDevice: state.bluetooth.selectedDevice })

const mapDispatchToProps = {
  addDevice
}

export default connect(mapStateToProps, mapDispatchToProps)(BluetoothScanner)
