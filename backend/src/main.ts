
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { PermissionsService } from './permissions/permissions.service';
import { PERMISSION_MAP } from './Constants/permissions.map';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Enable validation globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // forbidNonWhitelisted: true,
      transform: true,
    }),
  );
app.enableCors({
  origin: [
    'http://localhost:3000',       // ✅ local frontend
    'http://192.168.4.117:3000',   // ✅ LAN frontend
  ],
  credentials: true,
});

  const permissionsService = app.get(PermissionsService);
  await permissionsService.syncPermissions(Object.values(PERMISSION_MAP));


  // ✅ Swagger configuration
  const config = new DocumentBuilder()
    .setTitle('Dummy Project API')
    .setDescription('API documentation for Users and Roles')
    .setVersion('1.0')
    .addTag('users')
    .addTag('roles')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger UI at /api

  await app.listen(3001); // your backend is on port 3001

    // await app.listen(3000); // your backend is on port 3001

}
bootstrap();
