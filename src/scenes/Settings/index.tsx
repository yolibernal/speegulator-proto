import { connect } from 'react-redux'
import React from 'react'
import { View, FlatList, Slider, Text } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { List, RadioButton, Divider, TextInput, Button } from 'react-native-paper'
import styles from './styles'
import { changeDisplayType, setDesiredSpeedMargin, setServiceUuid, setCharacteristicUuid, setIsDemoMode } from '../../actions/settings'
import { StateType } from '../../reducers'
import { selectDevice } from '../../actions/bluetooth'
import { DisplayType } from '../../services/display/DisplayType'
import { RadioButtonItem } from './components/RadioButtonItem'
import theme from '../../theme'
import BluetoothScanner from '../../services/bluetooth/BluetoothScanner'
import { SwitchItem } from './components/SwitchItem'
import { getDisplay } from '../../reducers/settings'
// NOTE: convert services to renderless components? https://kyleshevlin.com/renderless-components

type Props = {
  // TODO: redux action (creator) type
  changeDisplayType,
  selectDevice,
  displayType,
  devices,
  selectedDevice,
  setDesiredSpeedMargin,
  desiredSpeedMargin,
  serviceUuid,
  characteristicUuid,
  setServiceUuid,
  setCharacteristicUuid
  isDemoMode
  setIsDemoMode,
  display
}

type ComponentState = {
  desiredSpeedMargin: number
  serviceUuid: string
  characteristicUuid: string
}

class Settings extends React.Component<Props, ComponentState> {
  static navigationOptions = {}

  constructor(props) {
    super(props)
    this.state = {
      desiredSpeedMargin: this.props.desiredSpeedMargin,
      serviceUuid: this.props.serviceUuid,
      characteristicUuid: this.props.characteristicUuid
    }
  }

  render() {
    return (
      <KeyboardAwareScrollView>
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
            <RadioButtonItem value={DisplayType.VIBRATION} label={'Vibration'} />
            <RadioButtonItem value={DisplayType.VOICE} label={'Voice'} />
            <RadioButtonItem value={DisplayType.WEARABLE} label={'Wearable'} />
          </RadioButton.Group>
        </List.Section>

        {(this.props.displayType === DisplayType.WEARABLE) ? this.renderConnectWearable() : null}

        <List.Section>
          <List.Subheader>Desired speed margin</List.Subheader>
          <View style={styles.desiredSpeedMarginContainer}>
            <Slider
              minimumValue={0}
              maximumValue={5}
              minimumTrackTintColor={theme.colors.primary}
              maximumTrackTintColor={theme.colors.accent}
              thumbTintColor={theme.colors.primary}
              step={0.5}
              value={this.props.desiredSpeedMargin}
              onValueChange={value => this.setState({ desiredSpeedMargin: value })}
              onSlidingComplete={() => this.props.setDesiredSpeedMargin(this.state.desiredSpeedMargin)}
              style={styles.desiredSpeedMarginSlider}
            />
            <Text style={styles.desiredSpeedMarginLabel}>{this.state.desiredSpeedMargin}</Text>
          </View>
        </List.Section>
        <List.Section>
          <List.Subheader>Demo</List.Subheader>
          <SwitchItem label={'Demo mode'} enabled={this.props.isDemoMode} onValueChange={() => this.props.setIsDemoMode(!this.props.isDemoMode)} />
        </List.Section>
        {this.props.isDemoMode ? this.renderDemoMode() : null}
      </KeyboardAwareScrollView>
    )
  }

  renderDemoMode() {
    const { display } = this.props
    return (
      <List.Section>
        <Button onPress={async () => {
          await display.maneuver({ modifier: 'left', voiceInstructions: { announcement: 'Turn left.' } })
        }}>
          Display Left
        </Button>
        <Button onPress={async () => {
          await display.displayDecreaseSpeed()
        }}>
          Display Middle Left
        </Button>
        <Button onPress={async () => {
          await display.displayIncreaseSpeed()
        }}>
          Display Middle Right
        </Button>
        <Button onPress={async () => {
          await display.maneuver({ modifier: 'right', voiceInstructions: { announcement: 'Turn right.' } })
        }}>
          Display Right
        </Button>
      </List.Section>
    )
  }

  renderConnectWearable() {
    return (
      <>
        <BluetoothScanner />

        <List.Section>
          <List.Subheader>Connect wearable</List.Subheader>
          <FlatList
            data={this.props.devices}
            // data={[{ id: '12345', name: 'TECO Wearable 1' }, { id: '67890', name: 'TECO Wearable 2' }]}
            renderItem={
              ({ item }: { item: any }) =>
                <List.Item
                  title={item.name || 'Unnamed device'}
                  description={item.id}
                  left={() => <List.Icon color={'black'} icon={'devices-other'} />}
                  right={() => this.props.selectedDevice === item.id ? <List.Icon color={'black'} icon={'check'} /> : null}
                  onPress={() => this.props.selectDevice(item.id)}
                  key={item.id}
                />
            }
          />
          <Divider />
          <Divider />
          <TextInput
            label={'Service UUID'}
            value={`${this.state.serviceUuid || ''}`}
            onChangeText={text => this.setState({ serviceUuid: text })}
            onBlur={() => this.props.setServiceUuid(this.state.serviceUuid)}
            style={styles.input}
          />
          <TextInput
            label={'Characterstic UUID'}
            value={`${this.state.characteristicUuid || ''}`}
            onChangeText={text => this.setState({ characteristicUuid: text })}
            onBlur={() => this.props.setCharacteristicUuid(this.state.characteristicUuid)}
            style={styles.input}
          />
        </List.Section>
      </>
    )
  }
}

const mapStateToProps = (state: StateType) => ({ displayType: state.settings.displayType, devices: state.bluetooth.devices, selectedDevice: state.bluetooth.selectedDevice, desiredSpeedMargin: state.settings.desiredSpeedMargin, serviceUuid: state.settings.serviceUuid, characteristicUuid: state.settings.characteristicUuid, isDemoMode: state.settings.isDemoMode, display: getDisplay(state) })

export default connect(mapStateToProps, { changeDisplayType, selectDevice, setDesiredSpeedMargin, setServiceUuid, setCharacteristicUuid, setIsDemoMode })(Settings)
