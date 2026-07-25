import { Model } from 'mongoose';
import { BaseRepository } from '../../database/base.repository';
import { User } from './schemas/user.schema';
export declare class UserRepository extends BaseRepository<User> {
    private readonly userModel;
    constructor(userModel: Model<User>);
    findByEmailWithPassword(identifier: string): Promise<User | null>;
    findByEmail(identifier: string): Promise<User | null>;
    updateLastLogin(userId: string): Promise<void>;
}
