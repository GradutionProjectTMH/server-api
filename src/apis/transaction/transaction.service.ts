import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToInstance } from 'class-transformer';
import { Model } from 'mongoose';
import {
  Transaction,
  TransactionDocument,
} from 'src/apis/transaction/transaction.schema';
import { removeKeyUndefined } from '../../utils/utils';
import { TransactionDto } from './dto/transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<TransactionDocument>,
  ) {}

  async getAll() {
    return await this.transactionModel.find();
  }

  async getById(id: string, userId: string) {
    const transaction = await this.transactionModel.findById(id).lean();
    if (!transaction) {
      throw new Error(`Transaction with id '${id}' doesn't exist`);
    }
    return transaction;
  }

  async create(data: TransactionDto, userId: string) {
    const transactionInstance = plainToInstance(Transaction, data);
    const transaction = new this.transactionModel(transactionInstance);
    return transaction.save();
  }

  async updateById(id: string, data: TransactionDto, userId: string) {
    const transaction = await this.transactionModel.findById(id).lean();
    if (!transaction) {
      throw new Error(`Transaction with id '${id}' doesn't exist`);
    }

    const transactionInstance = plainToInstance(Transaction, data);

    return this.transactionModel.findByIdAndUpdate(
      id,
      {
        ...transaction,
        ...removeKeyUndefined(transactionInstance),
        updatedAt: new Date(),
      },
      { new: true },
    );
  }

  async deleteById(id: string, userId: string) {
    const transaction = await this.transactionModel.findById(id).lean();
    if (!transaction) {
      throw new Error(`Transaction with id '${id}' doesn't exist`);
    }

    await this.transactionModel.deleteOne({ _id: id });

    return transaction;
  }
}
