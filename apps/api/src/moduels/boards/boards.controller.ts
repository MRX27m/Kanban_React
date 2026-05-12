import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { ZodValidationPipe } from 'nestjs-zod';
import { BoardsService } from './boards.service';
import {
  CreateBoardDto,
  AddMemberDto,
  createBoardSchema,
  addMemberSchema,
} from './boards.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BoardAccessGuard } from './board-access.guard';

@UseGuards(JwtAuthGuard, BoardAccessGuard)
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  findAll(@Request() req) {
    return this.boardsService.findAll(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardsService.findOne(id);
  }

  @Post()
  create(
    @Body(new ZodValidationPipe(createBoardSchema)) dto: CreateBoardDto,
    @Request() req,
  ) {
    return this.boardsService.create(dto, req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    if (req.boardMember?.role !== 'owner') {
      throw new ForbiddenException('Тільки власник може видалити дошку');
    }
    return this.boardsService.remove(id);
  }

  @Post(':id/members')
  addMember(
    @Param('id') boardId: string,
    @Body(new ZodValidationPipe(addMemberSchema)) dto: AddMemberDto,
    @Request() req,
  ) {
    if (req.boardMember?.role !== 'owner') {
      throw new ForbiddenException('Тільки власник може додавати учасників');
    }
    return this.boardsService.addMember(boardId, dto);
  }

  @Get(':id/members')
  getMembers(@Param('id') boardId: string) {
    return this.boardsService.getMembers(boardId);
  }
}
