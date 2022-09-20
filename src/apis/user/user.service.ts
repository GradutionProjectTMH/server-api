import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/apis/user/user.schema';
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
    return this.userModel.findById(id);
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

  async deleteById(id: string) {
    const user = await this.userModel.findByIdAndDelete(id);

    if (!user) throw new Error('User not found');
    return user;
  }
}
