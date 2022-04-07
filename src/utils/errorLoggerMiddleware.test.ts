import 'reflect-metadata'

import { LoggerStub } from '@services/loggerService/loggerStub'
import { createRequest, createResponse } from 'node-mocks-http'
import { errorLoggerHandler } from './errorLoggerMiddleware'

describe('ErrorLoggerHandler Middleware', () => {
  const logger = new LoggerStub('debug')
  const handler = errorLoggerHandler(logger)

  test('Si recibe error de sintaxis no lo envia a log', async done => {
    const logsCount = logger.dumpLogs().length

    // Preparacion de HTTP props
    const req = createRequest({
      method: 'GET',
      url: '/fake',
    })
    const res = createResponse()

    const next = (error: any) => {
      expect(logger.dumpLogs()).toHaveLength(logsCount)
      done()
    }
    const err = new SyntaxError('Error de datos')

    // llamo al handler para que haga lo suyo
    handler(err, req, res, next)
    res.end()
  })

  test('Si recibe error (no sintaxis) lo envia a log', async done => {
    const logsCount = logger.dumpLogs().length

    // Preparacion de HTTP props
    const req = createRequest({
      method: 'GET',
      url: '/fake',
    })
    const res = createResponse()
    const next = (error: any) => {
      expect(logger.dumpLogs()).toHaveLength(logsCount + 1)
      done()
    }
    const err = new Error('Error normal')

    // llamo al handler para que haga lo suyo
    handler(err, req, res, next)
    res.end()
  })
})
