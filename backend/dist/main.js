"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const helmet_1 = require("helmet");
const compression = require("compression");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const logger = new common_1.Logger('Bootstrap');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('port') || 5000;
    app.use((0, helmet_1.default)());
    app.use(compression());
    const configuredFrontendUrl = configService.get('cors.frontendUrl') || '';
    const allowedOrigins = [
        'https://lead-board-mini.vercel.app',
        'http://localhost:3000',
        'http://localhost:3001',
        'http://127.0.0.1:3000',
        ...configuredFrontendUrl.split(',').map((url) => url.trim().replace(/\/+$/, '')),
    ].filter(Boolean);
    app.enableCors({
        origin: (origin, callback) => {
            if (!origin)
                return callback(null, true);
            const cleanOrigin = origin.replace(/\/+$/, '');
            if (allowedOrigins.includes(cleanOrigin) || allowedOrigins.includes('*')) {
                callback(null, true);
            }
            else {
                logger.warn(`Blocked CORS request from unallowed origin: ${origin}`);
                callback(null, false);
            }
        },
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
        credentials: true,
    });
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));
    await app.listen(port);
    logger.log(`🚀 LeadDesk Mini Backend running on port ${port} [API Prefix: /api]`);
}
bootstrap();
//# sourceMappingURL=main.js.map