import * as secrets from './secrets.json'

const name = 'speegulator-proto'

const vibrationDisplay = {
  patterns: {
    increase: [0, 1000, 0, 2000],
    decrease: [0, 3000]
  }
}

const voiceCommandDisplay = {
  commands: {
    increase: 'Increase speed, Mothertrucker',
    decrease: 'Slow down, Cowboy!'
  },
  duckingEnabled: true
}

const configs = {
  name,
  mapbox: {
    accessToken: secrets.mapbox.accessToken
  },
  display: {
    vibrationDisplay,
    voiceCommandDisplay
  }
}

export default configs
