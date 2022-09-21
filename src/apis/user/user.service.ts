import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/apis/user/user.schema';
import { removeFile } from '../../base/base.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async getAll() {
    return this.userModel.find();
  }

  async getById(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) throw new Error('User not found');

    return user;
  }

  async updateById(id: string, data: UserDto) {
    const user = await this.userModel.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true },
    );

    if (!user) throw new Error('User not found');
    return user;
  }

  async uploadAvatar(userId: string, avatar: Express.Multer.File) {
    const user = await this.userModel
      .findByIdAndUpdate(userId, {
        avatar: `${process.env.APP_URL}${avatar.filename}`,
      })
      .lean();

    if (!user) throw new Error('User not found');

    if (user.avatar) removeFile(user.avatar);
    return { ...user, avatar: `${process.env.APP_URL}${avatar.filename}` };
  }
}
