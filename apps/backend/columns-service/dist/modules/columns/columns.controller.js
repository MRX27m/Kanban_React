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
const columns_service_1 = require("./columns.service");
let ColumnsController = class ColumnsController {
    constructor(columnsService) {
        this.columnsService = columnsService;
    }
    syncBoard(data) {
        return this.columnsService.syncBoard(data);
    }
    findAll(data) {
        return this.columnsService.findAll(data.boardId);
    }
    create(data) {
        return this.columnsService.create(data);
    }
    update(data) {
        return this.columnsService.update(data);
    }
    remove(data) {
        return this.columnsService.remove(data.id);
    }
    move(data) {
        return this.columnsService.move(data);
    }
};
exports.ColumnsController = ColumnsController;
__decorate([
    (0, microservices_1.MessagePattern)('columns.sync_board'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ColumnsController.prototype, "syncBoard", null);
__decorate([
    (0, microservices_1.MessagePattern)('columns.find_all'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ColumnsController.prototype, "findAll", null);
__decorate([
    (0, microservices_1.MessagePattern)('columns.create'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ColumnsController.prototype, "create", null);
__decorate([
    (0, microservices_1.MessagePattern)('columns.update'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ColumnsController.prototype, "update", null);
__decorate([
    (0, microservices_1.MessagePattern)('columns.remove'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ColumnsController.prototype, "remove", null);
__decorate([
    (0, microservices_1.MessagePattern)('columns.move'),
    __param(0, (0, microservices_1.Payload)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ColumnsController.prototype, "move", null);
exports.ColumnsController = ColumnsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [columns_service_1.ColumnsService])
], ColumnsController);
//# sourceMappingURL=columns.controller.js.map