import DirectionsClient from '../services/maps/DirectionsClient'
const directionsClient = new DirectionsClient()

export const SELECT_ROUTE = 'SELECT_ROUTE'
export const selectRoute = routeWaypoints => ({
  type: SELECT_ROUTE,
  routeWaypoints
})

export const REQUEST_DIRECTIONS = 'REQUEST_DIRECTIONS'
export const requestDirections = routeWaypoints => ({
  type: REQUEST_DIRECTIONS,
  routeWaypoints
})

export const RECEIVE_DIRECTIONS = 'RECEIVE_DIRECTIONS'
export const receiveDirections = directions => ({
  type: RECEIVE_DIRECTIONS,
  directions,
  receivedAt: Date.now()
})

export const START_NEXT_NAVIGATION_STEP = 'START_NEXT_NAVIGATION_STEP'
export const startNextNavigationStep = () => ({
  type: START_NEXT_NAVIGATION_STEP
})

export const fetchDirections = routeWaypoints => async (dispatch) => {
  dispatch(requestDirections(routeWaypoints))
  const directions = await directionsClient.fetchDirections(routeWaypoints)
  dispatch(receiveDirections(directions))
}
