import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../users/users.repository';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: UserRepository, jwtService: JwtService);
    login(loginDto: LoginDto): Promise<{
        message: string;
        data: {
            accessToken: string;
            user: {
                id: string;
                username: string;
                email: string;
                role: import("../users/schemas/user.schema").UserRole;
            };
        };
    }>;
    getProfile(userId: string): Promise<{
        message: string;
        data: {
            id: string;
            username: string;
            email: string;
            role: import("../users/schemas/user.schema").UserRole;
            lastLogin: Date;
        };
    }>;
}
