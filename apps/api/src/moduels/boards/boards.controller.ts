import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto, AddMemberDto } from './boards.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  findAll(@Request() req) {
    return this.boardsService.findAll(req.user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    await this.boardsService.checkAccess(id, req.user.id);
    return this.boardsService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateBoardDto, @Request() req) {
    return this.boardsService.create(dto, req.user.id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    await this.boardsService.checkOwner(id, req.user.id);
    return this.boardsService.remove(id);
  }

  @Post(':id/members')
  async addMember(
    @Param('id') boardId: string,
    @Body() dto: AddMemberDto,
    @Request() req,
  ) {
    await this.boardsService.checkOwner(boardId, req.user.id);
    return this.boardsService.addMember(boardId, dto);
  }

  @Get(':id/members')
  async getMembers(@Param('id') boardId: string, @Request() req) {
    await this.boardsService.checkAccess(boardId, req.user.id);
    return this.boardsService.getMembers(boardId);
  }
}
