// tslint:disable-next-line: no-var-requires
require('module-alias/register')

import dotenv = require('dotenv')
if (process.env.NODE_ENV !== 'production') {
  dotenv.load()
}
import 'reflect-metadata'

import { ConfigService } from '@config/vars/configService'
const config = new ConfigService()
const configErr = config.load()
if (configErr) throw new Error(configErr)

import { Log4jsLogger } from '@services/loggerService/loggerLog4js'
const logger = new Log4jsLogger(config)
const expressLogger = logger.getExpressLogger()

import bodyParser from 'body-parser'
import cors from 'cors'
import helmet from 'helmet'
import { InversifyExpressServer } from 'inversify-express-utils'
import { createLightship } from 'lightship'
import { container } from '~/config/ioc/inversify.config'
import { errorHandler } from '~/utils/errorHandlerMiddleware'
import { errorLoggerHandler } from '~/utils/errorLoggerMiddleware'
import { TYPES } from './config/ioc/types'

const httpPort = config.getVars().server.port
const httpRootPath = config.getVars().server.rootPath

import '@config/ioc/loader'

container.bind<any>(TYPES.IConfig).toConstantValue(config)

const server = new InversifyExpressServer(container, null, {
  rootPath: httpRootPath,
})

server.setConfig(expressApp => {
  expressApp.use(expressLogger)
  expressApp.use(bodyParser.json())
  expressApp.use(helmet())
  expressApp.use(cors())
  expressApp.use(errorLoggerHandler(logger))
  expressApp.use(errorHandler)
})
const app = server.build()

import swaggerUiExpress from 'swagger-ui-express'
import apiDocsJson from '~/api-docs.json'

if (process.env.NODE_ENV !== 'production') {
  app.use(
    '/api-docs',
    swaggerUiExpress.serve,
    swaggerUiExpress.setup(apiDocsJson)
  )
}

// DB connection
import {connect} from './config/connection/connection'
connect()

const lightship = createLightship({ port: 9000 })

lightship.registerShutdownHandler(() => {
  httpServer.close()
})

const httpServer = app.listen(httpPort, () => {
  logger.info(`HTTP server started at http://localhost:${httpPort}`)

  setTimeout(() => {
    lightship.signalReady()
  }, 10000)
})

console.warn('process.env', JSON.stringify(process.env))

exports = module.exports = app
