import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { DSchema } from '../../core/decorators/schema.decorator';
import { User } from '../user/user.schema';
import { DETAIL_DRAWING_STATUS } from './enum/detail-drawing.enum';

@Schema()
class Design2D {
  @Prop({ type: Number })
  house_boundary: number;

  @Prop({ type: Number })
  width: number;

  @Prop({ type: Number })
  height: number;

  @Prop({ type: String })
  boundaryImg: string;

  @Prop({ type: String })
  crossSectionImg: string;
}

@Schema()
class ExpectedMaterial {
  @Prop({ type: String })
  name: string;

  @Prop({ type: Number })
  amount: number;
}

@Schema()
class Room {
  @Prop({ type: String })
  name: string;

  @Prop({ type: Number })
  amount: number;
}

export type DetailDrawingDocument = DetailDrawing & Document;

@DSchema()
export class DetailDrawing {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  userId: string;

  @Prop({ type: Design2D })
  design2D: Design2D;

  @Prop({ type: Array<ExpectedMaterial> })
  expectedMaterial: ExpectedMaterial[];

  @Prop({ type: Array<Room> })
  rooms: Room[];

  @Prop({ type: String, enum: DETAIL_DRAWING_STATUS })
  status: DETAIL_DRAWING_STATUS;
}

export const DetailDrawingSchema = SchemaFactory.createForClass(DetailDrawing);
