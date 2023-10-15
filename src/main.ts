import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

    const options = new DocumentBuilder()
        .setTitle('Issue Tracker API')
        .setDescription(
            'Nest.js backend API',
        )
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
}
bootstrap();
