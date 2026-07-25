import { UserRepository } from './users.repository';
import { User } from './schemas/user.schema';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
}
