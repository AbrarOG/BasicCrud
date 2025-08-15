"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const permissions_service_1 = require("./permissions/permissions.service");
const permissions_map_1 = require("./Constants/permissions.map");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
    }));
    app.enableCors({
        origin: [
            'http://localhost:3000',
            'http://192.168.4.117:3000',
        ],
        credentials: true,
    });
    const permissionsService = app.get(permissions_service_1.PermissionsService);
    await permissionsService.syncPermissions(Object.values(permissions_map_1.PERMISSION_MAP));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Dummy Project API')
        .setDescription('API documentation for Users and Roles')
        .setVersion('1.0')
        .addTag('users')
        .addTag('roles')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(3001);
}
bootstrap();
//# sourceMappingURL=main.js.map