import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DSchema } from '../../core/decorators/schema.decorator';

export type TransactionDocument = Transaction & Document;

@DSchema()
export class Transaction {
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
