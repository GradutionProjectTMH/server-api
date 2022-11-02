import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import { removeKeyUndefined } from '../../base/services/base.service';
import { Coin, CoinDocument } from './coin.schema';
import { CoinDto } from './dto/coin.dto';

@Injectable()
export class CoinService {
  constructor(
    @InjectModel(Coin.name)
    private readonly coinModel: Model<CoinDocument>,
  ) {}

  async getAll() {
    return this.coinModel.find().lean();
  }

  async getById(id: string) {
    const coin = await this.coinModel.findById(id).lean();
    if (!coin) {
      throw new Error(`Coin with id '${id}' doesn't exist`);
    }
    return coin;
  }

  async create(data: CoinDto) {
    const coinInstance = plainToInstance(Coin, data);
    const coin = new this.coinModel(coinInstance);
    return coin.save();
  }

  async insertMany(data: Coin[]) {
    await this.coinModel.remove();
    return this.coinModel.insertMany(data);
  }

  async updateById(id: string, data: CoinDto) {
    const coin = await this.coinModel.findById(id).lean();
    if (!coin) {
      throw new Error(`Coin with id '${id}' doesn't exist`);
    }

    const coinInstance = plainToInstance(Coin, data);

    return this.coinModel.findByIdAndUpdate(
      id,
      {
        ...Coin,
        ...removeKeyUndefined(coinInstance),
        updatedAt: new Date(),
      },
      { new: true },
    );
  }

  async deleteById(id: string) {
    const coin = await this.coinModel.findById(id).lean();
    if (!coin) {
      throw new Error(`Coin with id '${id}' doesn't exist`);
    }

    await this.coinModel.deleteOne({ _id: id });

    return coin;
  }
}
