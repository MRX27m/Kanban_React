import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateColumnDto, UpdateColumnDto } from './columns.dto';

@Injectable()
export class ColumnsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(boardId: string) {
    return this.prisma.column.findMany({
      where: { boardId },
      include: { tasks: true },
      orderBy: { order: 'asc' },
    });
  }

  async create(boardId: string, dto: CreateColumnDto) {
    const count = await this.prisma.column.count({ where: { boardId } });
    return this.prisma.column.create({
      data: { name: dto.name, boardId, order: count },
      include: { tasks: true },
    });
  }

  async update(id: string, dto: UpdateColumnDto) {
    return this.prisma.column.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    return this.prisma.column.delete({ where: { id } });
  }

  async move(boardId: string, id: string, direction: 'left' | 'right') {
    const columns = await this.prisma.column.findMany({
      where: { boardId },
      orderBy: { order: 'asc' },
    });
    const index = columns.findIndex((c) => c.id === id);
    const targetIndex = direction === 'left' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= columns.length) return columns;

    await this.prisma.column.update({
      where: { id: columns[index].id },
      data: { order: columns[targetIndex].order },
    });
    await this.prisma.column.update({
      where: { id: columns[targetIndex].id },
      data: { order: columns[index].order },
    });
    return this.prisma.column.findMany({
      where: { boardId },
      include: { tasks: true },
      orderBy: { order: 'asc' },
    });
  }
}
