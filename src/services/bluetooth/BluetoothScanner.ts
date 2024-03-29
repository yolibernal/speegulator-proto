import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

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

  private startDeviceScan() {
    try {
      bleManager.startDeviceScan(
        null,
        {},
        _.throttle(
          (error, device) => {
            if (error) console.error(error)
            this.props.addDevice(device)
          },
          200
        ))
    } catch (error) {
      console.warn('Could not start device scan:', error)
    }
  }

  componentWillUnmount() {
    try {
      bleManager.stopDeviceScan()
    } catch (error) {
      console.warn('Could not stop device scan:', error)
    }
  }
}

const mapStateToProps = (state: StateType) => ({ selectedDevice: state.bluetooth.selectedDevice })

const mapDispatchToProps = {
  addDevice
}

export default connect(mapStateToProps, mapDispatchToProps)(BluetoothScanner)
