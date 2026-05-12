import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import { ColumnsService } from './columns.service';
import {
  CreateColumnDto,
  UpdateColumnDto,
  MoveColumnDto,
  createColumnSchema,
  updateColumnSchema,
  moveColumnSchema,
} from './columns.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BoardAccessGuard } from '../boards/board-access.guard';

@UseGuards(JwtAuthGuard, BoardAccessGuard)
@Controller('boards/:boardId/columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @Get()
  findAll(@Param('boardId') boardId: string) {
    return this.columnsService.findAll(boardId);
  }

  @Post()
  create(
    @Param('boardId') boardId: string,
    @Body(new ZodValidationPipe(createColumnSchema)) dto: CreateColumnDto,
  ) {
    return this.columnsService.create(boardId, dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateColumnSchema)) dto: UpdateColumnDto,
  ) {
    return this.columnsService.update(id, dto);
  }

  @Patch(':id/move')
  move(
    @Param('boardId') boardId: string,
    @Param('id') id: string,
    @Body(new ZodValidationPipe(moveColumnSchema)) dto: MoveColumnDto,
  ) {
    return this.columnsService.move(boardId, id, dto.direction);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.columnsService.remove(id);
  }
}
