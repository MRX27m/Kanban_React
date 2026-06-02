import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class BoardsService {
  constructor(private readonly prisma: PrismaService) {}

  async syncUser(data: { id: string; email: string; name: string }) {
    return this.prisma.userRef.upsert({
      where: { id: data.id },
      update: { email: data.email, name: data.name },
      create: { id: data.id, email: data.email, name: data.name },
    });
  }

  async checkAccess(boardId: string, userId: string) {
    const member = await this.prisma.boardMember.findUnique({
      where: { userId_boardId: { userId, boardId } },
    });
    if (!member) {
      throw new ForbiddenException("Немає доступу до цієї дошки");
    }
    return member;
  }

  async findAll(userId: string) {
    return this.prisma.board.findMany({
      where: { members: { some: { userId } } },
      include: { members: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.board.findUnique({
      where: { id },
      include: {
        members: {
          include: {
            user: { select: { id: true, email: true, name: true } },
          },
        },
      },
    });
  }

  async create(data: { name: string; userId: string }) {
    return this.prisma.board.create({
      data: {
        name: data.name,
        members: { create: { userId: data.userId, role: "owner" } },
      },
    });
  }

  async remove(id: string) {
    return this.prisma.board.delete({ where: { id } });
  }

  async addMember(data: { boardId: string; userId: string; email: string }) {
    const user = await this.prisma.userRef.findFirst({
      where: { email: data.email },
    });
    if (!user) {
      throw new NotFoundException("Користувача з таким email не знайдено");
    }
    return this.prisma.boardMember.create({
      data: { boardId: data.boardId, userId: user.id, role: "member" },
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
