import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Mixed } from 'mongoose';
import { DSchema } from '../../core/decorators/schema.decorator';
import { DetailDrawing } from '../detail-drawing/detail-drawing.schema';
import { User } from '../user/user.schema';
import { STATUS_DRAWING_FLOOR, STATUS_HIRE } from './enum/hire.enum';

@Schema()
class ItemDesign {
  @Prop({ type: String })
  image: string;

  @Prop({ type: String })
  coHomeUrl: string;

  @Prop({ type: Boolean })
  isChoose: boolean;

  @Prop({ type: Object })
  materials: Mixed;
}

@Schema()
class ItemFloorDesign {
  @Prop({ type: Number })
  floor: number;

  @Prop({ type: Array<ItemDesign> })
  designs: ItemDesign[];

  @Prop({ type: String, enum: STATUS_DRAWING_FLOOR })
  status: boolean;

  @Prop({ type: String })
  phaseId: string;
}

@Schema()
class ItemHouseDesign {
  @Prop({ type: Array<ItemDesign> })
  designs: ItemDesign[];

  @Prop({ type: Boolean })
  status: boolean;
}

export type HireDocument = Hire & Document;

@DSchema()
export class Hire {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  userId: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  designerId: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: DetailDrawing.name,
    required: true,
  })
  detailDrawingId: string;

  @Prop({ type: Array<ItemFloorDesign> })
  floorDesigns: ItemFloorDesign[];

  @Prop({ type: Array<ItemHouseDesign> })
  houseDesigns: ItemHouseDesign[];

  @Prop({ type: String, enum: STATUS_HIRE, required: true })
  status: STATUS_HIRE;

  @Prop({ type: Object })
  transactions: Mixed[];

  @Prop({ type: String })
  projectId: string;
}

export const HireSchema = SchemaFactory.createForClass(Hire);
