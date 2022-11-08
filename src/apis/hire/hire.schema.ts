import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { DSchema } from '../../core/decorators/schema.decorator';
import { DetailDrawing } from '../detail-drawing/detail-drawing.schema';
import { User } from '../user/user.schema';
import { STATUS_HIRE } from './enum/hire.enum';

@Schema()
class ItemDesign {
  @Prop({ type: String })
  image: string;

  @Prop({ type: String })
  coHomeUrl: string;

  @Prop({ type: Boolean })
  isChoose: boolean;
}

@Schema()
class ItemFloorDesign {
  @Prop({ type: Number })
  floor: number;

  @Prop({ type: Array<ItemDesign> })
  designs: ItemDesign[];
}

export type HireDocument = Hire & Document;

@DSchema()
export class Hire {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  userId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  designerId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: DetailDrawing.name })
  detailDrawingId: string;

  @Prop({ type: Array<ItemFloorDesign> })
  floorDesigns: ItemFloorDesign[];

  @Prop({ type: Array<ItemDesign> })
  houseDesigns: ItemDesign[];

  @Prop({ type: String, enum: STATUS_HIRE })
  status: STATUS_HIRE;
}

export const HireSchema = SchemaFactory.createForClass(Hire);
