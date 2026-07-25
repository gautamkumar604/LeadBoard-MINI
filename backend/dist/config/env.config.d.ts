export declare const envConfig: () => {
    port: number;
    nodeEnv: string;
    database: {
        uri: string;
    };
    jwt: {
        secret: string;
        expiresIn: string;
    };
    cors: {
        frontendUrl: string;
    };
    throttle: {
        ttl: number;
        limit: number;
    };
};
