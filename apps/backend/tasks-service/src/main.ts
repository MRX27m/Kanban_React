import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { TASKS_QUEUE, RABBITMQ_URL } from './constants';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [RABBITMQ_URL],
        queue: TASKS_QUEUE,
        queueOptions: { durable: true },
      },
    },
  );

  await app.listen();
  console.log('Tasks Service запущено, слухає чергу:', TASKS_QUEUE);
}

bootstrap();
