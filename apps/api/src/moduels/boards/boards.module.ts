import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { AuthModule } from '../auth/auth.module';
import { BoardAccessGuard } from './board-access.guard';

@Module({
  imports: [AuthModule],
  controllers: [BoardsController],
  providers: [BoardsService, BoardAccessGuard],
  exports: [BoardsService, BoardAccessGuard],
})
export class BoardsModule {}
