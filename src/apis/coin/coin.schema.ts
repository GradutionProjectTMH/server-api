import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DSchema } from '../../core/decorators/schema.decorator';

export type CoinDocument = Coin & Document;

@DSchema()
export class Coin {
  @Prop({ type: String, unique: true })
  name: string;

  @Prop({ type: String })
  symbol: string;

  @Prop({ type: String })
  price: string;

  @Prop({ type: String })
  icon: string;

  @Prop({ type: String })
  color: string;
}

export const CoinSchema = SchemaFactory.createForClass(Coin);
