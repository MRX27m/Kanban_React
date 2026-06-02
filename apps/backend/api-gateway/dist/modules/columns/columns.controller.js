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
exports.ColumnsController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const jwt_auth_guard_1 = require("../../common/jwt-auth.guard");
let ColumnsController = class ColumnsController {
    constructor(boardsClient, columnsClient, tasksClient) {
        this.boardsClient = boardsClient;
        this.columnsClient = columnsClient;
        this.tasksClient = tasksClient;
    }
    async findAll(boardId, req) {
        await this.checkAccess(boardId, req.user.id);
        return (0, rxjs_1.firstValueFrom)(this.columnsClient.send('columns.find_all', { boardId }));
    }
    async create(boardId, body, req) {
        await this.checkAccess(boardId, req.user.id);
        const result = await (0, rxjs_1.firstValueFrom)(this.columnsClient.send('columns.create', {
            name: body.name,
            boardId,
        }));
        await (0, rxjs_1.firstValueFrom)(this.tasksClient.send('tasks.sync_column', { id: result.id }));
        return result;
    }
    async update(boardId, id, body, req) {
        await this.checkAccess(boardId, req.user.id);
        return (0, rxjs_1.firstValueFrom)(this.columnsClient.send('columns.update', { id, ...body }));
    }
    async move(boardId, id, body, req) {
        await this.checkAccess(boardId, req.user.id);
        return (0, rxjs_1.firstValueFrom)(this.columnsClient.send('columns.move', { boardId, id, direction: body.direction }));
    }
    async remove(boardId, id, req) {
        await this.checkAccess(boardId, req.user.id);
        return (0, rxjs_1.firstValueFrom)(this.columnsClient.send('columns.remove', { id }));
    }
    async checkAccess(boardId, userId) {
        return (0, rxjs_1.firstValueFrom)(this.boardsClient.send('boards.check_access', { boardId, userId }));
    }
};
exports.ColumnsController = ColumnsController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('boardId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ColumnsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('boardId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], ColumnsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('boardId')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], ColumnsController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/move'),
    __param(0, (0, common_1.Param)('boardId')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], ColumnsController.prototype, "move", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('boardId')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], ColumnsController.prototype, "remove", null);
exports.ColumnsController = ColumnsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('boards/:boardId/columns'),
    __param(0, (0, common_1.Inject)('BOARDS_SERVICE')),
    __param(1, (0, common_1.Inject)('COLUMNS_SERVICE')),
    __param(2, (0, common_1.Inject)('TASKS_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        microservices_1.ClientProxy,
        microservices_1.ClientProxy])
], ColumnsController);
//# sourceMappingURL=columns.controller.js.map