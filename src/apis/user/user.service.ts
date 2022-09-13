import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/apis/user/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async getAll() {
    return;
  }

  async getById() {
    return;
  }

  async create() {
    return;
  }

  async updateById() {
    return;
  }

  async deleteById() {
    return;
  }
}
