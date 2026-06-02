import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class ColumnsService {
  constructor(private readonly prisma: PrismaService) {}

  async syncBoard(data: { id: string }) {
    return this.prisma.boardRef.upsert({
      where: { id: data.id },
      update: {},
      create: { id: data.id },
    });
  }

  async findAll(boardId: string) {
    return this.prisma.column.findMany({
      where: { boardId },
      orderBy: { order: "asc" },
    });
  }

  async create(data: { name: string; boardId: string }) {
    await this.prisma.boardRef.upsert({
      where: { id: data.boardId },
      update: {},
      create: { id: data.boardId },
    });

    const count = await this.prisma.column.count({
      where: { boardId: data.boardId },
    });
    return this.prisma.column.create({
      data: { name: data.name, boardId: data.boardId, order: count },
    });
  }

  async update(data: { id: string; name?: string; order?: number }) {
    return this.prisma.column.update({
      where: { id: data.id },
      data: { name: data.name, order: data.order },
    });
  }

  async remove(id: string) {
    return this.prisma.column.delete({ where: { id } });
  }

  async move(data: {
    boardId: string;
    id: string;
    direction: "left" | "right";
  }) {
    const columns = await this.prisma.column.findMany({
      where: { boardId: data.boardId },
      orderBy: { order: "asc" },
    });

    const index = columns.findIndex((c) => c.id === data.id);
    const targetIndex = data.direction === "left" ? index - 1 : index + 1;

    if (targetIndex < 0 || targetIndex >= columns.length) return columns;

    const currentOrder = columns[index].order;
    const targetOrder = columns[targetIndex].order;

    await this.prisma.$transaction([
      this.prisma.column.update({
        where: { id: columns[index].id },
        data: { order: targetOrder },
      }),
      this.prisma.column.update({
        where: { id: columns[targetIndex].id },
        data: { order: currentOrder },
      }),
    ]);

    const updated = await this.prisma.column.findMany({
      where: { boardId: data.boardId },
      orderBy: { order: "asc" },
    });

    await this.prisma.$transaction(
      updated.map((col, i) =>
        this.prisma.column.update({
          where: { id: col.id },
          data: { order: i },
        }),
      ),
    );

    return this.prisma.column.findMany({
      where: { boardId: data.boardId },
      orderBy: { order: "asc" },
    });
  }
}
