import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Address } from '../../base/schemas/address.schema';
import { ORDER_STATUS } from '../../core/constants/enum';
import { DSchema } from '../../core/decorators/schema.decorator';
import { Product } from '../product/product.schema';
import { User } from '../user/user.schema';

@Schema()
class OrderProduct {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Product.name })
  productId: string;

  @Prop()
  amount: number;
}

export type OrderDocument = Order & Document;

@DSchema()
export class Order {
  @Prop({ type: Array<OrderProduct> })
  products: OrderProduct[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  userId: string;

  @Prop({ type: String, enum: ORDER_STATUS, default: ORDER_STATUS.PENDING })
  status: ORDER_STATUS;

  @Prop({ type: Address })
  address: Address;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
