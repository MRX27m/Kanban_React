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
import { ColumnsService } from './columns.service';
import { CreateColumnDto, UpdateColumnDto, MoveColumnDto } from './columns.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BoardsService } from '../boards/boards.service';

@UseGuards(JwtAuthGuard)
@Controller('boards/:boardId/columns')
export class ColumnsController {
  constructor(
    private readonly columnsService: ColumnsService,
    private readonly boardsService: BoardsService,
  ) {}

  @Get()
  async findAll(@Param('boardId') boardId: string, @Request() req) {
    await this.boardsService.checkAccess(boardId, req.user.id);
    return this.columnsService.findAll(boardId);
  }

  @Post()
  async create(
    @Param('boardId') boardId: string,
    @Body() dto: CreateColumnDto,
    @Request() req,
  ) {
    await this.boardsService.checkAccess(boardId, req.user.id);
    return this.columnsService.create(boardId, dto);
  }

  @Patch(':id')
  async update(
    @Param('boardId') boardId: string,
    @Param('id') id: string,
    @Body() dto: UpdateColumnDto,
    @Request() req,
  ) {
    await this.boardsService.checkAccess(boardId, req.user.id);
    return this.columnsService.update(id, dto);
  }

  @Patch(':id/move')
  async move(
    @Param('boardId') boardId: string,
    @Param('id') id: string,
    @Body() dto: MoveColumnDto,
    @Request() req,
  ) {
    await this.boardsService.checkAccess(boardId, req.user.id);
    return this.columnsService.move(boardId, id, dto.direction);
  }

  @Delete(':id')
  async remove(
    @Param('boardId') boardId: string,
    @Param('id') id: string,
    @Request() req,
  ) {
    await this.boardsService.checkAccess(boardId, req.user.id);
    return this.columnsService.remove(id);
  }
}
