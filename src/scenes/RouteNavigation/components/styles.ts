import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  fetchingIndicatorContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignContent: 'center'
  },
  fetchingIndicator: {
    marginBottom: 50
  },
  fetchingIndicatorLabel: {
    textAlign: 'center'
  },
  instructions: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center'
  },
  instructionsIcon: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    alignSelf: 'center'
  },
  instructionsText: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center'
  }
})
