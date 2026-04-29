import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: 'http://localhost:3001',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
  });

  const PORT = 3000;
  await app.listen(PORT);
  console.log(`Сервер запущено: http://localhost:${PORT}`);
}

bootstrap();
