import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { PrismaModule } from './prisma/prisma.module';
import { BoardsModule } from './moduels/boards/boards.module';
import { ColumnsModule } from './moduels/columns/columns.module';
import { TasksModule } from './moduels/tasks/tasks.module';
import { AuthModule } from './moduels/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule, BoardsModule, ColumnsModule, TasksModule],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
