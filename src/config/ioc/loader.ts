import { buildProviderModule, container } from '@config/ioc/inversify.config'

/* REST Controllers */
import '~/routes/v1/victims/victims.controller'

/* Services */
import '@services/loggerService/loggerLog4js'

container.load(buildProviderModule())
