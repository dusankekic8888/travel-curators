import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

if (process.env.NODE_ENV || process.env.NODE_ENV === 'prod') {
  require('module-alias/register');
}
async function bootstrap() {
  const APP_PORT = process.env.APP_PORT;
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Travel Test')
    .setDescription('Travel Test API description')
    .setVersion('0.1')
    .addBearerAuth(
      { 
        description: `[just text field] Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer', 
        scheme: 'Bearer',
        type: 'http',
        in: 'Header'
      },
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(APP_PORT, () =>
    console.log(`===>>>> Server is running on port ${APP_PORT}`),
  );
}

bootstrap();
