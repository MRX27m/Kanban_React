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
exports.TasksController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const rxjs_1 = require("rxjs");
const jwt_auth_guard_1 = require("../../common/jwt-auth.guard");
let TasksController = class TasksController {
    constructor(boardsClient, tasksClient) {
        this.boardsClient = boardsClient;
        this.tasksClient = tasksClient;
    }
    async findAll(boardId, columnId, req) {
        await this.checkAccess(boardId, req.user.id);
        return (0, rxjs_1.firstValueFrom)(this.tasksClient.send('tasks.find_all', { columnId }));
    }
    async create(boardId, columnId, body, req) {
        await this.checkAccess(boardId, req.user.id);
        return (0, rxjs_1.firstValueFrom)(this.tasksClient.send('tasks.create', { text: body.text, columnId }));
    }
    async update(boardId, id, body, req) {
        await this.checkAccess(boardId, req.user.id);
        return (0, rxjs_1.firstValueFrom)(this.tasksClient.send('tasks.update', { id, ...body }));
    }
    async move(boardId, id, body, req) {
        await this.checkAccess(boardId, req.user.id);
        return (0, rxjs_1.firstValueFrom)(this.tasksClient.send('tasks.move', {
            id,
            targetColumnId: body.targetColumnId,
        }));
    }
    async remove(boardId, id, req) {
        await this.checkAccess(boardId, req.user.id);
        return (0, rxjs_1.firstValueFrom)(this.tasksClient.send('tasks.remove', { id }));
    }
    async checkAccess(boardId, userId) {
        return (0, rxjs_1.firstValueFrom)(this.boardsClient.send('boards.check_access', { boardId, userId }));
    }
};
exports.TasksController = TasksController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('boardId')),
    __param(1, (0, common_1.Param)('columnId')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Param)('boardId')),
    __param(1, (0, common_1.Param)('columnId')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('boardId')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id/move'),
    __param(0, (0, common_1.Param)('boardId')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "move", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('boardId')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], TasksController.prototype, "remove", null);
exports.TasksController = TasksController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('boards/:boardId/columns/:columnId/tasks'),
    __param(0, (0, common_1.Inject)('BOARDS_SERVICE')),
    __param(1, (0, common_1.Inject)('TASKS_SERVICE')),
    __metadata("design:paramtypes", [microservices_1.ClientProxy,
        microservices_1.ClientProxy])
], TasksController);
//# sourceMappingURL=tasks.controller.js.map