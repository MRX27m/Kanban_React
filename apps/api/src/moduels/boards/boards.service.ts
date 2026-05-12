import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBoardDto, AddMemberDto } from './boards.dto';

@Injectable()
export class BoardsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(userId: string) {
    return this.prisma.board.findMany({
      where: { members: { some: { userId } } },
      include: { columns: { include: { tasks: true } } },
    });
  }

  async findOne(id: string) {
    return this.prisma.board.findUnique({
      where: { id },
      include: {
        columns: { include: { tasks: true } },
        members: {
          include: {
            user: { select: { id: true, email: true, name: true } },
          },
        },
      },
    });
  }

  async create(dto: CreateBoardDto, userId: string) {
    return this.prisma.board.create({
      data: {
        name: dto.name,
        members: { create: { userId, role: 'owner' } },
      },
    });
  }

  async remove(id: string) {
    return this.prisma.board.delete({ where: { id } });
  }

  async addMember(boardId: string, dto: AddMemberDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) {
      throw new NotFoundException('Користувача з таким email не знайдено');
    }
    return this.prisma.boardMember.create({
      data: { boardId, userId: user.id, role: 'member' },
      include: {
        user: { select: { id: true, email: true, name: true } },
      },
    });
  }

  async getMembers(boardId: string) {
    return this.prisma.boardMember.findMany({
      where: { boardId },
      include: {
        user: { select: { id: true, email: true, name: true } },
      },
    });
  }
}
