import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async syncColumn(data: { id: string }) {
    return this.prisma.columnRef.upsert({
      where: { id: data.id },
      update: {},
      create: { id: data.id },
    });
  }

  async findAll(columnId: string) {
    return this.prisma.task.findMany({
      where: { columnId },
      orderBy: { order: "asc" },
    });
  }

  async create(data: { text: string; columnId: string }) {
    await this.prisma.columnRef.upsert({
      where: { id: data.columnId },
      update: {},
      create: { id: data.columnId },
    });

    const count = await this.prisma.task.count({
      where: { columnId: data.columnId },
    });
    return this.prisma.task.create({
      data: { text: data.text, columnId: data.columnId, order: count },
    });
  }

  async update(data: { id: string; text?: string; order?: number }) {
    return this.prisma.task.update({
      where: { id: data.id },
      data: { text: data.text, order: data.order },
    });
  }

  async remove(id: string) {
    return this.prisma.task.delete({ where: { id } });
  }

  async move(data: { id: string; targetColumnId: string }) {
    await this.prisma.columnRef.upsert({
      where: { id: data.targetColumnId },
      update: {},
      create: { id: data.targetColumnId },
    });

    const count = await this.prisma.task.count({
      where: { columnId: data.targetColumnId },
    });

    return this.prisma.task.update({
      where: { id: data.id },
      data: { columnId: data.targetColumnId, order: count },
    });
  }
}
