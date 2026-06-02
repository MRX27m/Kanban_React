"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.AUTH_QUEUE = exports.RABBITMQ_URL = void 0;
exports.RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672';
exports.AUTH_QUEUE = 'auth_queue';
exports.JWT_SECRET = process.env.JWT_SECRET || 'JWT_SECRET';
//# sourceMappingURL=constants.js.map