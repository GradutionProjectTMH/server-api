import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { DSchema } from '../../core/decorators/schema.decorator';
import { User } from '../user/user.schema';
import { PROJECT_STATUS } from './enum/project.enum';

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

@Schema()
class CoHomeLink {
  @Prop({ type: String })
  co_home_link: string;
}

@Schema()
class StepOne {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  designerId: string;

  @Prop({ type: Array<CoHomeLink> })
  firstFloorDesigns: CoHomeLink[];

  @Prop({ type: Number })
  numDrafts: number;

  @Prop({ type: Number })
  audittedTimes: number;

  @Prop({ type: Number })
  status: number;
}

@Schema()
class StepTwo {}

export type ProjectDocument = Project & Document;

@DSchema()
export class Project {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  userId: string;

  @Prop({ type: Design2D })
  design2D: Design2D;

  @Prop({ type: Array<ExpectedMaterial> })
  expectedMaterial: ExpectedMaterial[];

  @Prop({ type: Array<Room> })
  rooms: Room[];

  @Prop({ type: String, enum: PROJECT_STATUS })
  status: PROJECT_STATUS;

  @Prop({ type: StepOne })
  stepOne: StepOne;

  @Prop({ type: StepTwo })
  stepTwo: StepTwo;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
