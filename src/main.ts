import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true, // whitelist - remove unnecessary data
        forbidNonWhitelisted: true, // error message for nonWhiteListes fields
        transform: true, //  Auto-transform Payloads to DTO instances
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
  );

  await app.listen(3000);
}
bootstrap();
