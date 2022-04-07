import { TYPES } from '@config/ioc/types'
import { ILogger } from '@services/loggerService'
import * as express from 'express'
import { IResponse } from '../../../models/Response.model'
import { generalMap } from '../../../services/victims/general-map'

import { inject } from 'inversify'
import {
  controller,
  httpPost,
  interfaces,
  next,
  request,
  response,
} from 'inversify-express-utils'

@controller('/victims-map')
export class VictimsController implements interfaces.Controller {
  constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

  @httpPost('/general-map')
  public async generalMap(
    @request() req: express.Request,
    @response() res: express.Response,
    @next() nextFunc: express.NextFunction
  ) {

    try {
      const echoMessage = await generalMap(req.query)
      const httpResponse: IResponse = {
        data: echoMessage,
      }
      res.json(httpResponse)
      nextFunc()
    } catch (err) {
      this.logger.error(`POST /v1/echo - Error en echo service: ${err}`)
      const httpResponse: IResponse = {
        data: '',
        errors: ['internal_server_error'],
      }
      res.status(500).json(httpResponse)
      nextFunc()
    }
  }

  @httpPost('/department')
  public async post(
    @request() req: express.Request,
    @response() res: express.Response,
    @next() nextFunc: express.NextFunction
  ) {

    try {
      const echoMessage = await generalMap(req.query)
      const httpResponse: IResponse = {
        data: echoMessage,
      }
      res.json(httpResponse)
      nextFunc()
    } catch (err) {
      this.logger.error(`POST /v1/echo - Error en echo service: ${err}`)
      const httpResponse: IResponse = {
        data: '',
        errors: ['internal_server_error'],
      }
      res.status(500).json(httpResponse)
      nextFunc()
    }
  }
}