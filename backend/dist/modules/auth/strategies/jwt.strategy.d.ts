import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '../../users/users.repository';
export interface JwtPayload {
    sub: string;
    email: string;
    role: string;
}
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly configService;
    private readonly userRepository;
    constructor(configService: ConfigService, userRepository: UserRepository);
    validate(payload: JwtPayload): Promise<{
        userId: string;
        email: string;
        username: string;
        role: import("../../users/schemas/user.schema").UserRole;
    }>;
}
export {};
