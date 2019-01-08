import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View } from 'react-native'
import styles from './styles'
import { StateType } from '../../reducers'

interface Props {
  geolocation: object
}
class Home extends Component<Props, {}> {
  static navigationOptions = {
    title: 'Speegulator Prototype',
  }

  constructor(props: Props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Geolocation: {JSON.stringify(this.props.geolocation)}</Text>
      </View>
    )
  }
}

const mapStateToProps = (state: StateType) => ({ geolocation: state.geolocation })

export default connect(mapStateToProps)(Home)
