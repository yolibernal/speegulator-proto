/*
  NOTE: types broken for sub-package /distance, see: https://github.com/Turfjs/turf/issues/1568
  replace when fixed
*/
import turfDistance from '@turf/distance'
import Position from '../../../services/geolocation/Position'

export default class GeoUtils {

  public static calculateDistance(fromPosition: Position, toPosition: Position) {
    const convertToPositionArray = ({ longitude, latitude }: Position) => [longitude, latitude]
    return turfDistance(
      convertToPositionArray(fromPosition),
      convertToPositionArray(toPosition),
      { units: 'kilometers' }
    )
  }
}
