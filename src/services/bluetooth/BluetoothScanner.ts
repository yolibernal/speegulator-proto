import React from 'react'
import { connect } from 'react-redux'
import pino from 'pino'
import _ from 'lodash'

import { BleManager, Device } from 'react-native-ble-plx'
import Logger from '../../Logger'
import { addDevice } from '../../actions/bluetooth'
import { StateType } from '../../reducers'

type Props = {
  selectedDevice,
  addDevice
}

type ComponentState = {}

class BluetoothScanner extends React.Component<Props, ComponentState> {

  private bleManager: BleManager
  private logger: pino.Logger

  constructor(props) {
    super(props)
    this.bleManager = new BleManager()
    this.logger = Logger.getLoggerForClass(this)
  }

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
    this.bleManager.startDeviceScan(
      null,
      {},
      _.throttle((error, device) => {
        if (error) this.logger.error(error)
        this.props.addDevice(device)
      }))
  }
}

const mapStateToProps = (state: StateType) => ({ selectedDevice: state.bluetooth.selectedDevice })

const mapDispatchToProps = {
  addDevice
}

export default connect(mapStateToProps, mapDispatchToProps)(BluetoothScanner)
