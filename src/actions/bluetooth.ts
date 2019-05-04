export const ADD_DEVICE = 'ADD_DEVICE'
export const SELECT_DEVICE = 'SELECT_DEVICE'

export const addDevice = device => ({
  type: ADD_DEVICE,
  device
})

// TODO: async action: connect to device
export const selectDevice = deviceId => ({
  type: SELECT_DEVICE,
  deviceId
})
