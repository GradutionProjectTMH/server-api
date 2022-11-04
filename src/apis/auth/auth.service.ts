import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as hashPassword from 'src/core/common/hashPassword';
import { ROLE, USER_STATUS } from 'src/core/constants/enum';
import { initializeApp } from '../../utils/firebase';
import { SIGNUP_TYPE } from '../user/enum/user.enum';
import { User, UserDocument } from '../user/user.schema';
import { LoginByEmailDto, LoginByGoogleDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  private readonly initializeApp = initializeApp();

  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async loginByEmail(login: LoginByEmailDto) {
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

  async loginByGoogle(data: LoginByGoogleDto) {
    const firebase = await this.initializeApp;
    const result = await firebase.auth().verifyIdToken(data.token);

    const user = await this.userModel
      .findOne({ email: result.email })
      .select('+password')
      .lean();
    if (!user) {
      const newUser = new this.userModel({
        firstName: result['name'],
        lastName: '',
        avatar: result.picture,
        email: result.email,
        status: USER_STATUS.ACTIVE,
        password: '',
        role: ROLE.USER,
        idToken: data.token,
        signupType: SIGNUP_TYPE.GOOGLE,
      });

      const userSave = await newUser.save();
      const payload = { id: newUser._id, role: newUser.role };

      const token = this.jwtService.sign(payload, {
        secret: process.env.KEY_SECRET_JWT,
        expiresIn: process.env.EXPIRES_IN,
      });

      delete userSave.password;

      return {
        ...userSave,
        token,
      };
    }

    const payload = { id: user._id, role: user.role };
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
      signupType: SIGNUP_TYPE.EMAIL_PASSWORD,
    });

    return newUser.save();
  }

  async checkToken(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) throw new Error('User does not exist!');
    return user;
  }
}
