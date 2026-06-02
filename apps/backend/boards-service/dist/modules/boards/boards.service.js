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
exports.BoardsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let BoardsService = class BoardsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async syncUser(data) {
        return this.prisma.userRef.upsert({
            where: { id: data.id },
            update: { email: data.email, name: data.name },
            create: { id: data.id, email: data.email, name: data.name },
        });
    }
    async checkAccess(boardId, userId) {
        const member = await this.prisma.boardMember.findUnique({
            where: { userId_boardId: { userId, boardId } },
        });
        if (!member) {
            throw new common_1.ForbiddenException('Немає доступу до цієї дошки');
        }
        return member;
    }
    async findAll(userId) {
        return this.prisma.board.findMany({
            where: { members: { some: { userId } } },
            include: { members: true },
        });
    }
    async findOne(id) {
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
    async create(data) {
        return this.prisma.board.create({
            data: {
                name: data.name,
                members: { create: { userId: data.userId, role: 'owner' } },
            },
        });
    }
    async remove(id) {
        return this.prisma.board.delete({ where: { id } });
    }
    async addMember(data) {
        const user = await this.prisma.userRef.findFirst({
            where: { email: data.email },
        });
        if (!user) {
            throw new common_1.NotFoundException('Користувача з таким email не знайдено');
        }
        return this.prisma.boardMember.create({
            data: { boardId: data.boardId, userId: user.id, role: 'member' },
            include: {
                user: { select: { id: true, email: true, name: true } },
            },
        });
    }
    async getMembers(boardId) {
        return this.prisma.boardMember.findMany({
            where: { boardId },
            include: {
                user: { select: { id: true, email: true, name: true } },
            },
        });
    }
};
exports.BoardsService = BoardsService;
exports.BoardsService = BoardsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BoardsService);
//# sourceMappingURL=boards.service.js.map