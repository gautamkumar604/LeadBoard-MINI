import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from '../../database/base.repository';
import { User } from './schemas/user.schema';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {
    super(userModel);
  }

  async findByEmailWithPassword(identifier: string): Promise<User | null> {
    const clean = identifier ? identifier.trim().toLowerCase() : '';
    return this.userModel
      .findOne({
        $or: [{ email: clean }, { username: clean }],
      })
      .select('+password')
      .exec();
  }

  async findByEmail(identifier: string): Promise<User | null> {
    const clean = identifier ? identifier.trim().toLowerCase() : '';
    return this.userModel
      .findOne({
        $or: [{ email: clean }, { username: clean }],
      })
      .exec();
  }

  async updateLastLogin(userId: string): Promise<void> {
    await this.userModel.findByIdAndUpdate(userId, { lastLogin: new Date() }).exec();
  }
}
