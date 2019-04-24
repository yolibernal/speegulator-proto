import { connect } from 'react-redux'
import React from 'react'
import { View, Text, FlatList } from 'react-native'
import { List, RadioButton, Divider, Subheading, TextInput } from 'react-native-paper'
import styles from './styles'
import { changeDisplayType, setDesiredSpeedMargin } from '../../actions/settings'
import { StateType } from '../../reducers'
import { selectDevice } from '../../actions/bluetooth'
import { DisplayType } from '../../services/display/DisplayType'
// NOTE: convert services to renderless components? https://kyleshevlin.com/renderless-components

type Props = {
  // TODO: redux action (creator) type
  changeDisplayType,
  selectDevice,
  displayType,
  devices,
  selectedDevice,
  setDesiredSpeedMargin,
  desiredSpeedMargin
}

type ComponentState = {
  desiredSpeedMargin: number
}

class Settings extends React.Component<Props, ComponentState> {
  static navigationOptions = {
    title: 'Settings'
  }

  constructor(props) {
    super(props)
    this.state = {
      desiredSpeedMargin: this.props.desiredSpeedMargin
    }
  }

  render() {
    const displayTypeButtons = ['Vibration', 'Speech', 'Wearable']
    return (
      <View>
        {/*
          TODO: setting ideas
          Unit (kmh, mph, m/s)
          Wearable Display (connect wearable)
          Voice Display (voice type, commands)
          Vibration Display (vibration pattern)
        */}

        <List.Section>
          <List.Subheader>Display type</List.Subheader>
          <RadioButton.Group
            onValueChange={selectedDisplayType => this.props.changeDisplayType(selectedDisplayType)}
            value={this.props.displayType}
          >
            <View style={styles.radioButtonItem}>
              <RadioButton value={DisplayType.VIBRATION} />
              <Text>Vibration</Text>
            </View>
            <View style={styles.radioButtonItem}>
              <RadioButton value={DisplayType.VOICE} />
              <Text>Voice</Text>
            </View>
            <View style={styles.radioButtonItem}>
              <RadioButton value={DisplayType.WEARABLE} />
              <Text>Wearable</Text>
            </View>
          </RadioButton.Group>
        </List.Section>

        {this.renderConnectWearable()}

        <List.Section>
          <List.Subheader>Desired speed margin</List.Subheader>
          <TextInput value={`${this.state.desiredSpeedMargin || ''}`} onChangeText={text => this.setState({ desiredSpeedMargin: Number.parseInt(text, 10) || 0 })} onBlur={() => this.props.setDesiredSpeedMargin(this.state.desiredSpeedMargin)} keyboardType="numeric" />
        </List.Section>
      </View >
    )
  }

  renderConnectWearable() {
    if (!(this.props.displayType === DisplayType.WEARABLE)) return
    return (
      <List.Accordion title={'Connect wearable'}>
        <Subheading>Found devices:</Subheading>
        <FlatList
          // TODO: enable data={this.props.devices}
          data={[{ id: '12345', name: 'TECO Wearble 1' }, { id: '67890', name: 'TECO Wearble 2' }]}
          renderItem={
            ({ item }: { item: any }) =>
              <List.Item
                title={item.name || 'Unnamed device'}
                onPress={() => this.props.selectDevice(item.id)}
                key={item.id}
              />
          }
        />
        <Divider />
        <Text>Selected device id: {this.props.selectedDevice}</Text>
      </List.Accordion>
    )
  }
}

const mapStateToProps = (state: StateType) => ({ displayType: state.settings.displayType, devices: state.bluetooth.devices, selectedDevice: state.bluetooth.selectedDevice, desiredSpeedMargin: state.settings.desiredSpeedMargin })

export default connect(mapStateToProps, { changeDisplayType, selectDevice, setDesiredSpeedMargin })(Settings)
