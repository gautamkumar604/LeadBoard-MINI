"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envConfig = void 0;
const envConfig = () => ({
    port: parseInt(process.env.PORT || '5000', 10),
    nodeEnv: process.env.NODE_ENV || 'development',
    database: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/leaddesk',
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'default-secret-key-change-in-production',
        expiresIn: process.env.JWT_EXPIRATION || '1d',
    },
    cors: {
        frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
    },
    throttle: {
        ttl: parseInt(process.env.THROTTLE_TTL || '60000', 10),
        limit: parseInt(process.env.THROTTLE_LIMIT || '100', 10),
    },
});
exports.envConfig = envConfig;
//# sourceMappingURL=env.config.js.map