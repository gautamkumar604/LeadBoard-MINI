import { OnApplicationBootstrap } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../modules/users/schemas/user.schema';
export declare class SeedService implements OnApplicationBootstrap {
    private readonly userModel;
    private readonly logger;
    constructor(userModel: Model<User>);
    onApplicationBootstrap(): Promise<void>;
    seedAdminUser(): Promise<void>;
}
