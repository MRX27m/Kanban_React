import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { CacheModule } from "@nestjs/cache-manager";
import { APP_PIPE } from "@nestjs/core";
import { ZodValidationPipe } from "nestjs-zod";
import { redisStore } from "cache-manager-ioredis-yet";

import { AuthController } from "./modules/auth/auth.controller";
import { BoardsController } from "./modules/boards/boards.controller";
import { ColumnsController } from "./modules/columns/columns.controller";
import { TasksController } from "./modules/tasks/tasks.controller";
import { JwtStrategy } from "./common/jwt.strategy";

import {
  RABBITMQ_URL,
  JWT_SECRET,
  AUTH_QUEUE,
  BOARDS_QUEUE,
  COLUMNS_QUEUE,
  TASKS_QUEUE,
} from "./common/constants";

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async (): Promise<any> => {
        try {
          const store = await redisStore({ host: "localhost", port: 6379 });
          return { store, ttl: 60000 };
        } catch {
          return { ttl: 60000, max: 100 };
        }
      },
    }),

    PassportModule,

    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: "7d" },
    }),

    ClientsModule.register([
      {
        name: "AUTH_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: [RABBITMQ_URL],
          queue: AUTH_QUEUE,
          queueOptions: { durable: true },
        },
      },
      {
        name: "BOARDS_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: [RABBITMQ_URL],
          queue: BOARDS_QUEUE,
          queueOptions: { durable: true },
        },
      },
      {
        name: "COLUMNS_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: [RABBITMQ_URL],
          queue: COLUMNS_QUEUE,
          queueOptions: { durable: true },
        },
      },
      {
        name: "TASKS_SERVICE",
        transport: Transport.RMQ,
        options: {
          urls: [RABBITMQ_URL],
          queue: TASKS_QUEUE,
          queueOptions: { durable: true },
        },
      },
    ]),
  ],
  controllers: [
    AuthController,
    BoardsController,
    ColumnsController,
    TasksController,
  ],
  providers: [JwtStrategy, { provide: APP_PIPE, useClass: ZodValidationPipe }],
})
export class AppModule {}
