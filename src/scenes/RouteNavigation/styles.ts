import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  containerCentered: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  banner: {
    flex: 1
  },
  map: {
    flex: 7
  },
  arrivedContainer: {
    height: '65%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center'
  },
  centeredText: {
    textAlign: 'center',
    flex: 1
  },
  arrivedImage: {
    flex: 1,
    resizeMode: 'contain',
    marginVertical: 50
  }
})
