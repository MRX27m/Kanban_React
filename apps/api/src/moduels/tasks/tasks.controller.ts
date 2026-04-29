import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto, MoveTaskDto } from './tasks.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BoardsService } from '../boards/boards.service';

@UseGuards(JwtAuthGuard)
@Controller('boards/:boardId/columns/:columnId/tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly boardsService: BoardsService,
  ) {}

  @Get()
  async findAll(@Param('boardId') boardId: string, @Request() req) {
    await this.boardsService.checkAccess(boardId, req.user.id);
    return this.tasksService.findAll(req.params?.columnId);
  }

  @Post()
  async create(
    @Param('boardId') boardId: string,
    @Param('columnId') columnId: string,
    @Body() dto: CreateTaskDto,
    @Request() req,
  ) {
    await this.boardsService.checkAccess(boardId, req.user.id);
    return this.tasksService.create(columnId, dto);
  }

  @Patch(':id')
  async update(
    @Param('boardId') boardId: string,
    @Param('id') id: string,
    @Body() dto: UpdateTaskDto,
    @Request() req,
  ) {
    await this.boardsService.checkAccess(boardId, req.user.id);
    return this.tasksService.update(id, dto);
  }

  @Patch(':id/move')
  async move(
    @Param('boardId') boardId: string,
    @Param('id') id: string,
    @Body() dto: MoveTaskDto,
    @Request() req,
  ) {
    await this.boardsService.checkAccess(boardId, req.user.id);
    return this.tasksService.move(id, dto);
  }

  @Delete(':id')
  async remove(
    @Param('boardId') boardId: string,
    @Param('id') id: string,
    @Request() req,
  ) {
    await this.boardsService.checkAccess(boardId, req.user.id);
    return this.tasksService.remove(id);
  }
}
