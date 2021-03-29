/* istanbul ignore file */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cors from 'cors';
import { environment } from './environment';

async function bootstrap() {

  console.log('env', environment)

  const app = await NestFactory.create(AppModule);
  app.use(cors({ origin: ['http://localhost:4200', 'https://www.due-volte.nl', 'https://fdx-frontend-dev.herokuapp.com/', 'https://fdx-frontend-master.herokuapp.com/'] }));

  const options = new DocumentBuilder()
    .setTitle('config.swaggerApiTitle')
    .setDescription('config.swaggerApiDescription')
    .setVersion('1.0')
    .addTag('config.swaggerApiTitle')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();