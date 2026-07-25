import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
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
