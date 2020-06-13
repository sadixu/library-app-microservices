import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger } from '@nestjs/common'

declare const module: any

const { SERVICE_NAME, SERVICE_VERSION, PORT } = process.env

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors()

  await app.listen(Number(PORT))

  Logger.log(`${SERVICE_NAME} V:${SERVICE_VERSION} successfully loaded.`)

  if (module.hot) {
    module.hot.accept()
    module.hot.dispose(async () => {
      await app.close()
      
    })
    Logger.log(`${SERVICE_NAME} V:${SERVICE_VERSION} Hot Reloading: ENABLED`)
  }
}

bootstrap()
