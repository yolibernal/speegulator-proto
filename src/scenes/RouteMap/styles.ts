import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  row: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  label: {
    flex: 1,
    flexWrap: 'wrap',
  },
  map: {
    flex: 9
  },
  footer: {
    flex: 1,
    justifyContent: 'center'
  }
})
