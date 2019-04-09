import { SELECT_ROUTE, REQUEST_DIRECTIONS, RECEIVE_DIRECTIONS } from '../actions/maps'

const maps = (
  state = {
    routeWaypoints: [],
    isFetching: false,
    directions: []
  },
  action
) => {
  switch (action.type) {
    case SELECT_ROUTE:
      return {
        ...state,
        routeWaypoints: action.routeWaypoints
      }
    case REQUEST_DIRECTIONS:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_DIRECTIONS:
      return {
        ...state,
        isFetching: false,
        directions: action.directions,
        lastUpdated: action.receivedAt
      }
    default:
      return state
  }
}

export default maps
