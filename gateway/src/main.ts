import { NestFactory } from '@nestjs/core'
import { GatewayModule } from './gateway/gateway.module'
import { Logger, ValidationPipe } from '@nestjs/common'

declare const module: any

const { SERVICE_NAME, SERVICE_VERSION, PORT } = process.env

async function bootstrap() {
  try {
    const app = await NestFactory.create(GatewayModule)
    app.enableCors()
    app.useGlobalPipes(new ValidationPipe())

    await app.listen(Number(PORT))

    Logger.log(`${SERVICE_NAME} V:${SERVICE_VERSION} successfully loaded.`)

    if (module.hot) {
      module.hot.accept()
      module.hot.dispose(async () => {
        await app.close()
      })

      Logger.log(`${SERVICE_NAME} V:${SERVICE_VERSION} Hot Reloading: ENABLED`)
    }
  } catch (error) {
    Logger.error(error)
  }
}

bootstrap()
