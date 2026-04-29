import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateTaskDto, UpdateTaskDto, MoveTaskDto } from './tasks.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(columnId: string) {
    return this.prisma.task.findMany({
      where: { columnId },
      orderBy: { order: 'asc' },
    });
  }

  async create(columnId: string, dto: CreateTaskDto) {
    const count = await this.prisma.task.count({ where: { columnId } });
    return this.prisma.task.create({
      data: { text: dto.text, columnId, order: count },
    });
  }

  async update(id: string, dto: UpdateTaskDto) {
    return this.prisma.task.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    return this.prisma.task.delete({ where: { id } });
  }

  async move(id: string, dto: MoveTaskDto) {
    return this.prisma.task.update({
      where: { id },
      data: { columnId: dto.targetColumnId },
    });
  }
}
