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
import { TasksService } from './tasks.service';
import {
  CreateTaskDto,
  UpdateTaskDto,
  MoveTaskDto,
  createTaskSchema,
  updateTaskSchema,
  moveTaskSchema,
} from './tasks.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BoardAccessGuard } from '../boards/board-access.guard';

@UseGuards(JwtAuthGuard, BoardAccessGuard)
@Controller('boards/:boardId/columns/:columnId/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(@Param('columnId') columnId: string) {
    return this.tasksService.findAll(columnId);
  }

  @Post()
  create(
    @Param('columnId') columnId: string,
    @Body(new ZodValidationPipe(createTaskSchema)) dto: CreateTaskDto,
  ) {
    return this.tasksService.create(columnId, dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateTaskSchema)) dto: UpdateTaskDto,
  ) {
    return this.tasksService.update(id, dto);
  }

  @Patch(':id/move')
  move(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(moveTaskSchema)) dto: MoveTaskDto,
  ) {
    return this.tasksService.move(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
