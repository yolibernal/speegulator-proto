import React, { Component } from 'react'
import { connect } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native'

interface Props { }
class Home extends Component<{ geolocation: object }, {}> {
  static navigationOptions = {
    title: 'Speegulator Prototype',
  }

  constructor(props: { geolocation: object }) {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
})

const mapStateToProps = state => ({ geolocation: state.geolocation })

export default connect(mapStateToProps)(Home)
