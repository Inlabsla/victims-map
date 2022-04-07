//
// Copyright (C) 2019 - Banco Davivienda S.A. y sus filiales.
//

import morgan from 'morgan'
import { ILogger } from '.'

export interface ILogLine {
  time: string
  level: string
  message: string
}

export class LoggerStub implements ILogger {
  private level: string
  private store: ILogLine[]

  constructor(level: string) {
    this.store = []
    this.level = level
  }

  public trace = (message: any, ...args: any[]) => {
    this.addLog('TRACE', message)
  }

  public debug = (message: any, ...args: any[]) => {
    this.addLog('DEBUG', message)
  }

  public info = (message: any, ...args: any[]) => {
    this.addLog('INFO', message)
  }

  public warn = (message: any, ...args: any[]) => {
    this.addLog('WARN', message)
  }

  public error = (message: any, ...args: any[]) => {
    this.addLog('ERROR', message)
  }

  public fatal = (message: any, ...args: any[]) => {
    this.addLog('FATAL', message)
  }

  public dumpLogs = () => {
    return this.store
  }

  public clearLogs = () => {
    this.store = []
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
      this.info(message.trim())
    } else {
      this.error(message.trim())
    }
  }

  private addLog = (level: string, message: string) => {
    const newLogLine: ILogLine = {
      level,
      message,

      time: new Date().toISOString(),
    }
    this.store.push(newLogLine)
  }
}
