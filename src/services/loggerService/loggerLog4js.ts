import { TYPES } from '@config/ioc/types'
import { IConfig } from '@config/vars'
import { inject } from 'inversify'
import { provide } from 'inversify-binding-decorators'
import { configure, Logger } from 'log4js'
import morgan from 'morgan'
import { ILogger } from '.'

export interface ILogLine {
  time: string
  level: string
  message: string
}

@provide(TYPES.ILogger)
export class Log4jsLogger implements ILogger {
  public defaultLogger: Logger
  public expressLogger: Logger
  private level: string

  constructor(@inject(TYPES.IConfig) config: IConfig) {
    // Configurar logger
    this.level = config.getVars().logger.level
    const logConfig = configure({
      appenders: {
        console: { type: 'console' },
      },
      categories: {
        default: { appenders: ['console'], level: this.level },
        express: { appenders: ['console'], level: this.level },
      },
    })
    // Instanciar el logger de aplicación y configurar el nivel de registro deseado
    this.defaultLogger = logConfig.getLogger('default')
    this.expressLogger = logConfig.getLogger('express')
  }

  public trace = (message: any, ...args: any[]) => {
    this.defaultLogger.trace(message, ...args)
  }

  public debug = (message: any, ...args: any[]) => {
    this.defaultLogger.debug(message, ...args)
  }

  public info = (message: any, ...args: any[]) => {
    this.defaultLogger.info(message, ...args)
  }

  public warn = (message: any, ...args: any[]) => {
    this.defaultLogger.warn(message, ...args)
  }

  public error = (message: any, ...args: any[]) => {
    this.defaultLogger.error(message, ...args)
  }

  public fatal = (message: any, ...args: any[]) => {
    this.defaultLogger.fatal(message, ...args)
  }

  public getExpressLogger = () => {
    // Instanciar el middleware de express para logs (Morgan) y configurarlo
    // para enviar todos los mensajes por el mismo canal
    return morgan(
      ':method :url HTTP/:http-version | :status | :response-time ms | :res[content-length] | :remote-addr | :remote-user',
      {
        stream: {
          write: this.logStream,
        },
      }
    )
  }

  // logStream es una función de soporte para Morgan de forma que los logs de Express
  // sean enviados a través del mismo logger de aplicación.
  // Esta función también analiza el status code resuelto y genera un Info o Error en
  // el registro de acuerdo al valor.
  public logStream = (message: string) => {
    const statusCode = Number(message.split(' | ')[1])
    if (statusCode < 400) {
      this.expressLogger.info(message.trim())
    } else {
      this.expressLogger.error(message.trim())
    }
  }
}
