"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const mongoose_1 = require("mongoose");
const PORT = process.env.PORT;
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({ origin: getCorsOrigins(), credentials: true });
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    app.setGlobalPrefix('api');
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Core NestJs')
        .setDescription('none')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('docs', app, document);
    if (process.env.NODE_ENV == 'development') {
        mongoose_1.default.set('debug', true);
    }
    await app.listen(PORT);
    console.log(`Server started on port: ${PORT}`);
}
bootstrap();
function getCorsOrigins() {
    const origins = process.env.CORS_ORIGINS;
    if (!origins)
        return '*';
    return origins.split(',').map((origin) => origin.trim());
}
//# sourceMappingURL=main.js.map