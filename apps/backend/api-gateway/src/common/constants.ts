export const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672';
export const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';
export const JWT_SECRET = process.env.JWT_SECRET || 'JWT_SECRET';

export const AUTH_QUEUE = 'auth_queue';
export const BOARDS_QUEUE = 'boards_queue';
export const COLUMNS_QUEUE = 'columns_queue';
export const TASKS_QUEUE = 'tasks_queue';
