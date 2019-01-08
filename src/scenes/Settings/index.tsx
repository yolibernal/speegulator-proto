import { connect } from 'react-redux'
import React from 'react'
import { View, Text } from 'react-native'
import { ListItem, ButtonGroup } from 'react-native-elements'
import styles from './styles'
import { changeDisplayType, DisplayType } from '../../actions/settings'
import { StateType } from '../..//reducers'

type Props = {
  // TODO: redux action (creator) type
  changeDisplayType,
  displayType
}

type ComponentState = {
  displayType: {
    selectedIndex: number
  }
}

class Settings extends React.Component<Props, ComponentState> {
  static navigationOptions = {
    title: 'Settings',
  }

  // TODO: combine with displayTypeButtons and map over
  static indexToDisplayType = [
    DisplayType.DeviceVibration,
    DisplayType.VoiceCommand,
    DisplayType.Haptic
  ]

  constructor(props) {
    super(props)
    this.state = {
      displayType: {
        selectedIndex: 0
      }
    }
  }

  render() {
    const displayTypeButtons = ['Vibration', 'Speech', 'Wearable']
    return (
      <View>
        <Text>These will be the settings!</Text>
        <Text>Unit (kmh, mph, m/s)</Text>
        <Text>Display (device vibration, haptic display, voice command)</Text>
        <Text>Haptic Display (connect wearable)</Text>
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

const mapStateToProps = (state: StateType) => ({ displayType: state.settings.displayType })

export default connect(mapStateToProps, { changeDisplayType })(Settings)
