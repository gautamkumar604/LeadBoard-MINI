import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from '../modules/users/schemas/user.schema';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async onApplicationBootstrap() {
    await this.seedAdminUser();
  }

  async seedAdminUser() {
    const adminEmail = 'admin@leaddesk.com';
    const existingAdmin = await this.userModel.findOne({ email: adminEmail }).exec();

    if (!existingAdmin) {
      const defaultPassword = 'Admin@123';
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(defaultPassword, saltRounds);

      const adminUser = new this.userModel({
        username: 'admin',
        email: adminEmail,
        password: hashedPassword,
        role: UserRole.ADMIN,
      });

      await adminUser.save();
      this.logger.log(`✅ Default admin user created successfully: ${adminEmail}`);
    } else {
      this.logger.log(`ℹ️ Admin user already exists: ${adminEmail}`);
    }
  }
}
