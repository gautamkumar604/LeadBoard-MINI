import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../users/users.repository';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const identifier = email ? email.trim().toLowerCase() : '';

    // 1. Fetch user including password hash (searches email & username)
    const user = await this.userRepository.findByEmailWithPassword(identifier);
    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // 2. Compare bcrypt password hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // 3. Update last login timestamp in database
    await this.userRepository.updateLastLogin(user._id.toString());

    // 4. Sign JWT Access Token
    const payload = {
      sub: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const token = this.jwtService.sign(payload);

    return {
      message: 'Login successful',
      data: {
        accessToken: token,
        user: {
          id: user._id.toString(),
          username: user.username,
          email: user.email,
          role: user.role,
        },
      },
    };
  }

  async getProfile(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return {
      message: 'User profile fetched successfully',
      data: {
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        role: user.role,
        lastLogin: user.lastLogin,
      },
    };
  }
}
