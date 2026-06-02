"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColumnsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ColumnsService = class ColumnsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async syncBoard(data) {
        return this.prisma.boardRef.upsert({
            where: { id: data.id },
            update: {},
            create: { id: data.id },
        });
    }
    async findAll(boardId) {
        return this.prisma.column.findMany({
            where: { boardId },
            orderBy: { order: 'asc' },
        });
    }
    async create(data) {
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
    async update(data) {
        return this.prisma.column.update({
            where: { id: data.id },
            data: { name: data.name, order: data.order },
        });
    }
    async remove(id) {
        return this.prisma.column.delete({ where: { id } });
    }
    async move(data) {
        const columns = await this.prisma.column.findMany({
            where: { boardId: data.boardId },
            orderBy: { order: 'asc' },
        });
        const index = columns.findIndex((c) => c.id === data.id);
        const targetIndex = data.direction === 'left' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= columns.length)
            return columns;
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
            orderBy: { order: 'asc' },
        });
        await this.prisma.$transaction(updated.map((col, i) => this.prisma.column.update({
            where: { id: col.id },
            data: { order: i },
        })));
        return this.prisma.column.findMany({
            where: { boardId: data.boardId },
            orderBy: { order: 'asc' },
        });
    }
};
exports.ColumnsService = ColumnsService;
exports.ColumnsService = ColumnsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ColumnsService);
//# sourceMappingURL=columns.service.js.map