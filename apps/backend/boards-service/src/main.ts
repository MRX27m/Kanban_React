import { NestFactory } from "@nestjs/core";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";
import { AppModule } from "./app.module";
import { BOARDS_QUEUE, RABBITMQ_URL } from "./constants";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [RABBITMQ_URL],
        queue: BOARDS_QUEUE,
        queueOptions: { durable: true },
      },
    },
  );

  await app.listen();
  console.log("Boards Service запущено, слухає чергу:", BOARDS_QUEUE);
}

bootstrap();
