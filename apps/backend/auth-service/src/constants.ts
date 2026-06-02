export const RABBITMQ_URL =
  process.env.RABBITMQ_URL || "amqp://guest:guest@localhost:5672";
export const AUTH_QUEUE = "auth_queue";
export const JWT_SECRET = process.env.JWT_SECRET || "JWT_SECRET";
