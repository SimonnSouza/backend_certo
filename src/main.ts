import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config =  new DocumentBuilder()
  .setTitle('Hunter´s Quest')
  .setDescription('API em NestJs pro RPG')
  .setVersion('1.0')
  .addTag('Game')
  .build();;

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document)

  await app.listen(process.env.PORT || 3000)
}
bootstrap();