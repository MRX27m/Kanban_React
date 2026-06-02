"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const cache_manager_1 = require("@nestjs/cache-manager");
const core_1 = require("@nestjs/core");
const nestjs_zod_1 = require("nestjs-zod");
const cache_manager_ioredis_yet_1 = require("cache-manager-ioredis-yet");
const auth_controller_1 = require("./modules/auth/auth.controller");
const boards_controller_1 = require("./modules/boards/boards.controller");
const columns_controller_1 = require("./modules/columns/columns.controller");
const tasks_controller_1 = require("./modules/tasks/tasks.controller");
const jwt_strategy_1 = require("./common/jwt.strategy");
const constants_1 = require("./common/constants");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            cache_manager_1.CacheModule.registerAsync({
                isGlobal: true,
                useFactory: async () => {
                    try {
                        const store = await (0, cache_manager_ioredis_yet_1.redisStore)({ host: 'localhost', port: 6379 });
                        return { store, ttl: 60000 };
                    }
                    catch {
                        return { ttl: 60000, max: 100 };
                    }
                },
            }),
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: constants_1.JWT_SECRET,
                signOptions: { expiresIn: '7d' },
            }),
            microservices_1.ClientsModule.register([
                {
                    name: 'AUTH_SERVICE',
                    transport: microservices_1.Transport.RMQ,
                    options: {
                        urls: [constants_1.RABBITMQ_URL],
                        queue: constants_1.AUTH_QUEUE,
                        queueOptions: { durable: true },
                    },
                },
                {
                    name: 'BOARDS_SERVICE',
                    transport: microservices_1.Transport.RMQ,
                    options: {
                        urls: [constants_1.RABBITMQ_URL],
                        queue: constants_1.BOARDS_QUEUE,
                        queueOptions: { durable: true },
                    },
                },
                {
                    name: 'COLUMNS_SERVICE',
                    transport: microservices_1.Transport.RMQ,
                    options: {
                        urls: [constants_1.RABBITMQ_URL],
                        queue: constants_1.COLUMNS_QUEUE,
                        queueOptions: { durable: true },
                    },
                },
                {
                    name: 'TASKS_SERVICE',
                    transport: microservices_1.Transport.RMQ,
                    options: {
                        urls: [constants_1.RABBITMQ_URL],
                        queue: constants_1.TASKS_QUEUE,
                        queueOptions: { durable: true },
                    },
                },
            ]),
        ],
        controllers: [
            auth_controller_1.AuthController,
            boards_controller_1.BoardsController,
            columns_controller_1.ColumnsController,
            tasks_controller_1.TasksController,
        ],
        providers: [
            jwt_strategy_1.JwtStrategy,
            { provide: core_1.APP_PIPE, useClass: nestjs_zod_1.ZodValidationPipe },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map