import { SELECT_ROUTE } from '../actions/maps'

const maps = (state = {}, action) => {
  switch (action.type) {
    case SELECT_ROUTE:
      return action.routeWaypoints
    default:
      return state
  }
}

export default maps
