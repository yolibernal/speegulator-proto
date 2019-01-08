import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, TextInput, GeolocationReturnType } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Feather'
import styles from './styles'
import { StateType } from '../../reducers'

interface Props {
  geolocation: GeolocationReturnType | {},
  // TODO: type
  navigation: any
}
class Home extends Component<Props, {}> {
  static navigationOptions = ({ navigation }) => ({
    title: 'Speegulator Prototype',
    headerRight: (
      <Button
        title="Settings"
        icon={
          <Icon
            name="settings"
            size={15}
            color="white"
          />
        }
        onPress={() => navigation.navigate('Settings')}
        buttonStyle={styles.settingsButton}
      />
    ),
  })

  constructor(props: Props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Geolocation: {JSON.stringify(this.props.geolocation)}</Text>
        <TextInput style={styles.speedInput} keyboardType="numeric"></TextInput>
      </View>
    )
  }
}

const mapStateToProps = (state: StateType) => ({ geolocation: state.geolocation })

export default connect(mapStateToProps)(Home)
