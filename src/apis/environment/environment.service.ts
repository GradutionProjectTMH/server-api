import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs';
import { Model } from 'mongoose';
import { ENVIRONMENT } from './enum/environment.enum';
import { Environment, EnvironmentDocument } from './environment.schema';

@Injectable()
export class EnvironmentService {
  constructor(
    @InjectModel(Environment.name)
    private readonly environmentModel: Model<EnvironmentDocument>,
  ) {}

  async getAll() {
    // const data = fs.readFileSync('public/env.client.json', 'utf8');
    const environment = await this.environmentModel.findOne({
      name: ENVIRONMENT.FRONT_END,
    });
    console.log('environment', environment);

    if (!environment) return this.create();

    return JSON.parse(environment.environment || null);
  }

  async create() {
    const data = fs.readFileSync('public/env.client.json', 'utf8');
    console.log(data);
    console.log(typeof data);

    const newEnvironment = new this.environmentModel({
      name: ENVIRONMENT.FRONT_END,
      environment: data,
    });

    const environment = await newEnvironment.save();
    return JSON.parse(environment.environment || null);
  }

  async updateById(data: string) {
    if (typeof data === 'object') {
      data = JSON.stringify(data);
    }

    const isExitEnvironment = await this.environmentModel
      .findOne({ name: ENVIRONMENT.FRONT_END })
      .lean();
    if (!isExitEnvironment) return this.create();
    return this.environmentModel.findOneAndUpdate(
      { name: ENVIRONMENT.FRONT_END },
      { environment: data },
      { new: true },
    );
  }
}
