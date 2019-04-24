import { connect } from 'react-redux'
import React from 'react'
import { View, Text, FlatList, Button, TextInput } from 'react-native'
import { ListItem } from 'react-native-elements'
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
  displayType: {
    selectedIndex: number
  },
  desiredSpeedMargin: number
}

class Settings extends React.Component<Props, ComponentState> {
  static navigationOptions = {
    title: 'Settings'
  }

  // TODO: combine with displayTypeButtons and map over
  static indexToDisplayType = [
    DisplayType.VIBRATION,
    DisplayType.VOICE,
    DisplayType.WEARABLE
  ]

  constructor(props) {
    super(props)
    this.state = {
      displayType: {
        selectedIndex: 0
      },
      desiredSpeedMargin: this.props.desiredSpeedMargin
    }
  }

  render() {
    const displayTypeButtons = ['Vibration', 'Speech', 'Wearable']
    return (
      <View>
        <Text>These will be the settings!</Text>
        <Text>Unit (kmh, mph, m/s)</Text>
        <Text>Display (device vibration, wearable display, voice command)</Text>
        <Text>Wearable Display (connect wearable)</Text>
        <Text>Voice Display (voice type, commands)</Text>
        <Text>Vibration Display (vibration pattern)</Text>
        <ListItem
          title="Display type"
          buttonGroup={{
            onPress: selectedIndex => this.handleDisplayTypeUpdate(selectedIndex),
            selectedIndex: Settings.indexToDisplayType.indexOf(this.props.displayType),
            buttons: displayTypeButtons,
            containerStyle: styles.displayTypeContainer,
            buttonStyle: styles.displayTypeButton,
            textStyle: styles.displayTypeText
          }}
        />
        <FlatList data={this.props.devices} renderItem={({ item }: { item: any }) => <Button key={item.id} title={item.name || 'Unnamed device'} onPress={() => this.props.selectDevice(item.id)}/>} />
        <Text>Selected device id {this.props.selectedDevice}</Text>
        <TextInput value={`${this.state.desiredSpeedMargin || ''}`} style={styles.desiredSpeedMarginInput} onChangeText={text => this.setState({ desiredSpeedMargin: Number.parseInt(text, 10) || 0 })} keyboardType="numeric" />
        <Button title="Set desired speed margin" onPress={() => this.props.setDesiredSpeedMargin(this.state.desiredSpeedMargin)} />
      </View>
    )
  }

  handleDisplayTypeUpdate(selectedIndex) {
    this.setState({
      displayType: {
        selectedIndex
      }
    })
    const newDisplayType = Settings.indexToDisplayType[selectedIndex]
    this.props.changeDisplayType(newDisplayType)
  }
}

const mapStateToProps = (state: StateType) => ({ displayType: state.settings.displayType, devices: state.bluetooth.devices, selectedDevice: state.bluetooth.selectedDevice, desiredSpeedMargin: state.settings.desiredSpeedMargin })

export default connect(mapStateToProps, { changeDisplayType, selectDevice, setDesiredSpeedMargin })(Settings)
