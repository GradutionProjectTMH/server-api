
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth, AuthDocument } from 'src/apis/auth/auth.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name)
    private readonly authModel: Model<AuthDocument>,
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

  