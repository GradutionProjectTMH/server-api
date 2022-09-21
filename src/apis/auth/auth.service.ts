import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as hashPassword from 'src/core/common/hashPassword';
import { ROLE, USER_STATUS } from 'src/core/constants/enum';
import { User, UserDocument } from '../user/user.schema';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async login(login: LoginDto) {
    const user = await this.userModel
      .findOne({ email: login.email })
      .select('+password')
      .lean();
    if (!user) throw new Error('Email does not exist');

    if (user.status === USER_STATUS.BLOCK)
      throw new Error('Account has been locked');

    const password = hashPassword.sha512(`${login.email}.${login.password}`);
    if (password !== user.password) throw new Error('Incorrect password');

    const payload = { id: user._id, role: user.role };

    // const token = jwt.sign(payload, appConfig.jwt.KEY_SECRET_JWT, { expiresIn: appConfig.jwt.EXPIRES_IN });
    const token = this.jwtService.sign(payload, {
      secret: process.env.KEY_SECRET_JWT,
      expiresIn: process.env.EXPIRES_IN,
    });

    delete user.password;

    return {
      ...user,
      token,
    };
  }

  async register(registerDto: RegisterDto) {
    const existEmail = await this.userModel
      .findOne({ email: registerDto.email })
      .lean();
    if (existEmail) throw new Error('Email already exists');

    if (registerDto.role === ROLE.ADMIN)
      throw new Error('You do not have permission to create this account');

    const status = USER_STATUS.ACTIVE;
    registerDto.password = hashPassword.sha512(
      `${registerDto.email}.${registerDto.password}`,
    );
    const newUser = new this.userModel({
      ...registerDto,
      status,
    });

    return newUser.save();
  }
}
