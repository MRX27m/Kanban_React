"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const app_module_1 = require("./app.module");
const constants_1 = require("./constants");
async function bootstrap() {
    const app = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: [constants_1.RABBITMQ_URL],
            queue: constants_1.TASKS_QUEUE,
            queueOptions: { durable: true },
        },
    });
    await app.listen();
    console.log('Tasks Service запущено, слухає чергу:', constants_1.TASKS_QUEUE);
}
bootstrap();
//# sourceMappingURL=main.js.map