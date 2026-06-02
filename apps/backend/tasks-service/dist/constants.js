"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TASKS_QUEUE = exports.RABBITMQ_URL = void 0;
exports.RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672';
exports.TASKS_QUEUE = 'tasks_queue';
//# sourceMappingURL=constants.js.map