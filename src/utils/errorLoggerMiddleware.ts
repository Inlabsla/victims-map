import { ILogger } from '@services/loggerService'
import { NextFunction, Request, Response } from 'express'

export const errorLoggerHandler = (logger: ILogger) => {
  return (err: any, req: Request, res: Response, next: NextFunction) => {
    const isSintaxError = err instanceof SyntaxError
    if (!isSintaxError) {
      logger.error(`Error: ${err.message} - StacK: ${err.stack}`)
    }
    next(err)
  }
}
