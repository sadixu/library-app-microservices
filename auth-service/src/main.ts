import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Logger, ValidationPipe } from '@nestjs/common'
import { Transport } from '@nestjs/microservices'
declare const module: any

const {
  RMQ_USER,
  RMQ_PASSWORD,
  RMQ_PORT,
  RMQ_HOST,
  RMQ_VIRTUAL_HOST,
  RMQ_USER_QUEUE,
  SERVICE_NAME,
  SERVICE_VERSION,
  PORT,
} = process.env

const rmqConnectionUrl = `amqp://${RMQ_USER}:${RMQ_PASSWORD}@${RMQ_HOST}:${RMQ_PORT}/${RMQ_VIRTUAL_HOST}`

async function bootstrap() {
  try {
    // const app = await NestFactory.create(AppModule)
    const app = await NestFactory.createMicroservice(AppModule, {
      transport: Transport.RMQ,
      options: {
        urls: [rmqConnectionUrl],
        queue: RMQ_USER_QUEUE,
        noAck: false,
        prefetchCount: 1,
      },
    })
    // app.enableCors()
    app.useGlobalPipes(new ValidationPipe())

    await app.listen(() => console.log('Microservice is listening'))

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
