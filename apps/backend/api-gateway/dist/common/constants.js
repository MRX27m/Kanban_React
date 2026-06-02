"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TASKS_QUEUE = exports.COLUMNS_QUEUE = exports.BOARDS_QUEUE = exports.AUTH_QUEUE = exports.JWT_SECRET = exports.REDIS_URL = exports.RABBITMQ_URL = void 0;
exports.RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672';
exports.REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
exports.JWT_SECRET = process.env.JWT_SECRET || 'JWT_SECRET';
exports.AUTH_QUEUE = 'auth_queue';
exports.BOARDS_QUEUE = 'boards_queue';
exports.COLUMNS_QUEUE = 'columns_queue';
exports.TASKS_QUEUE = 'tasks_queue';
//# sourceMappingURL=constants.js.map