import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices'
import { Logger } from '@nestjs/common';

declare const module: any;

const { RMQ_USER, RMQ_PASSWORD, RMQ_PORT, RMQ_HOST, RMQ_VIRTUAL_HOST, RMQ_USER_QUEUE, SERVICE_NAME, SERVICE_VERSION } = process.env

const rmqConnectionUrl = `amqp://${RMQ_USER}:${RMQ_PASSWORD}@${RMQ_HOST}:${RMQ_PORT}/${RMQ_VIRTUAL_HOST}`

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [rmqConnectionUrl],
      queue: RMQ_USER_QUEUE,
    },
  });

  await app.listen(() => Logger.log(`${SERVICE_NAME} V:${SERVICE_VERSION} successfully loaded.`));

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
    Logger.log(`${SERVICE_NAME} V:${SERVICE_VERSION} Hot Reloading: ENABLED`)
  }
}

bootstrap();
