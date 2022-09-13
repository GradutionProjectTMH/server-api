import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { PRODUCT_STATUS } from 'src/core/constants/enum';
import { DSchema } from 'src/core/decorators/schema.decorator';
import { BaseSchema } from '../../base/base.schema';

export type ProductDocument = Product & Document;

@DSchema()
export class Product extends BaseSchema {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: [String], required: true })
  images: string[];

  @Prop({ type: Number, default: 0 })
  star: number;

  @Prop({ type: Number, min: 0 })
  oldPrice: number;

  @Prop({ type: Number, min: 0 })
  price: number;

  @Prop({ type: Number, default: 0 })
  sale: number;

  @Prop({ type: Number, default: 0 })
  comment: number;

  @Prop({ type: Number, default: 0 })
  order: number;

  // @Prop({ type: String, required: true })
  // categories: [string];

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, enum: PRODUCT_STATUS })
  status: PRODUCT_STATUS;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users' })
  createdBy: ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
