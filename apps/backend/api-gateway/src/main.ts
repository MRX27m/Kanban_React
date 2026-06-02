import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as express from "express";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.setGlobalPrefix("api");

  app.enableCors({
    origin: [
      "http://localhost:3001",
      "http://localhost:3002",
      "http://localhost:3003",
    ],
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  });

  const PORT = 3000;
  await app.listen(PORT);
  console.log(`API Gateway запущено: http://localhost:${PORT}`);
  console.log("Підключено до RabbitMQ черг: auth, boards, columns, tasks");
}

bootstrap();
