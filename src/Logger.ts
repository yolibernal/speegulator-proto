import pino from 'pino'

import configs from '../configs'

const { name, loggerOptions: defaultOptions } = configs

const rootLogger = pino(defaultOptions).child({
  application: name
})
export default class Logger {

  public static getLogger(name: string) {
    return rootLogger.child({ name })
  }

  public static getLoggerForClass(instance: Object) {
    const name = instance.constructor.name
    return this.getLogger(name)
  }
}
