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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardsController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const jwt_auth_guard_1 = require("../../common/jwt-auth.guard");
let BoardsController = class BoardsController {
    constructor(boardsClient, columnsClient) {
        this.boardsClient = boardsClient;
        this.columnsClient = columnsClient;
    }
    findAll(req) {
        return (0, rxjs_1.firstValueFrom)(this.boardsClient.send('boards.find_all', { userId: req.user.id }));
    }
    async findOne(id, req) {
        await this.checkAccess(id, req.user.id);
        return (0, rxjs_1.firstValueFrom)(this.boardsClient.send('boards.find_one', { id }));
    }
    async create(body, req) {
        const result = await (0, rxjs_1.firstValueFrom)(this.boardsClient.send('boards.create', {
            name: body.name,
            userId: req.user.id,
        }));
        await (0, rxjs_1.firstValueFrom)(this.columnsClient.send('columns.sync_board', { id: result.id }));
        return result;
    }
    async remove(id, req) {
        const member = await this.checkAccess(id, req.user.id);
        if (member.role !== 'owner') {
            throw new common_1.ForbiddenException('Тільки власник може видалити дошку');
        }
        return (0, rxjs_1.firstValueFrom)(this.boardsClient.send('boards.remove', { id }));
    }
    async addMember(boardId, body, req) {
        const member = await this.checkAccess(boardId, req.user.id);
        if (member.role !== 'owner') {
            throw new common_1.ForbiddenException('Тільки власник може додавати учасників');
        }
        return (0, rxjs_1.firstValueFrom)(this.boardsClient.send('boards.add_member', {
            boardId,
            userId: req.user.id,
            email: body.email,
        }));
    }
    async getMembers(boardId, req) {
        await this.checkAccess(boardId, req.user.id);
        return (0, rxjs_1.firstValueFrom)(this.boardsClient.send('boards.get_members', { boardId }));
    }
    async checkAccess(boardId, userId) {
        return (0, rxjs_1.firstValueFrom)(this.boardsClient.send('boards.check_access', { boardId, userId }));
    }
};
exports.BoardsController = BoardsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BoardsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/members'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "addMember", null);
__decorate([
    (0, common_1.Get)(':id/members'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], BoardsController.prototype, "getMembers", null);
exports.BoardsController = BoardsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('boards'),
    __param(0, (0, common_1.Inject)('BOARDS_SERVICE')),
    __param(1, (0, common_1.Inject)('COLUMNS_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        microservices_1.ClientProxy])
], BoardsController);
//# sourceMappingURL=boards.controller.js.map