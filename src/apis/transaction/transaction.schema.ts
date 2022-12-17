import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { DSchema } from '../../core/decorators/schema.decorator';
import { User } from '../user/user.schema';

export type TransactionDocument = Transaction & Document;

@DSchema()
export class Transaction {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  userId: string;

  @Prop({ type: String })
  from: string;

  @Prop({ type: String })
  to: string;

  @Prop({ type: String })
  method: string;

  @Prop({ type: String })
  hash: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
