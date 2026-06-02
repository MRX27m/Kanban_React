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
const boards_service_1 = require("./boards.service");
let BoardsController = class BoardsController {
    constructor(boardsService) {
        this.boardsService = boardsService;
    }
    syncUser(data) {
        return this.boardsService.syncUser(data);
    }
    checkAccess(data) {
        return this.boardsService.checkAccess(data.boardId, data.userId);
    }
    findAll(data) {
        return this.boardsService.findAll(data.userId);
    }
    findOne(data) {
        return this.boardsService.findOne(data.id);
    }
    create(data) {
        return this.boardsService.create(data);
    }
    remove(data) {
        return this.boardsService.remove(data.id);
    }
    addMember(data) {
        return this.boardsService.addMember(data);
    }
    getMembers(data) {
        return this.boardsService.getMembers(data.boardId);
    }
};
exports.BoardsController = BoardsController;
__decorate([
    (0, microservices_1.MessagePattern)('boards.sync_user'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BoardsController.prototype, "syncUser", null);
__decorate([
    (0, microservices_1.MessagePattern)('boards.check_access'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BoardsController.prototype, "checkAccess", null);
__decorate([
    (0, microservices_1.MessagePattern)('boards.find_all'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BoardsController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)('boards.find_one'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BoardsController.prototype, "findOne", null);
__decorate([
    (0, microservices_1.MessagePattern)('boards.create'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BoardsController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)('boards.remove'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BoardsController.prototype, "remove", null);
__decorate([
    (0, microservices_1.MessagePattern)('boards.add_member'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BoardsController.prototype, "addMember", null);
__decorate([
    (0, microservices_1.MessagePattern)('boards.get_members'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BoardsController.prototype, "getMembers", null);
exports.BoardsController = BoardsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [boards_service_1.BoardsService])
], BoardsController);
//# sourceMappingURL=boards.controller.js.map