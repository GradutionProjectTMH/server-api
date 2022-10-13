import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionController } from 'src/apis/transaction/transaction.controller';
import { TransactionService } from 'src/apis/transaction/transaction.service';
import { Transaction, TransactionSchema } from 'src/apis/transaction/transaction.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }])],
  controllers: [TransactionController],
  providers: [TransactionService],
})

export class TransactionModule {}
