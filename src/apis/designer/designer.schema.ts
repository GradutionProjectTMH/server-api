import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { DSchema } from '../../core/decorators/schema.decorator';
import { User } from '../user/user.schema';

export type DesignerDocument = Designer & Document;

@Schema()
class ToolDesign {
  @Prop()
  name: string;

  @Prop()
  logo: string;
}

@Schema()
class Project {
  @Prop({ type: ToolDesign })
  tool: ToolDesign;

  @Prop()
  url: string;
}

@DSchema()
export class Designer {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  userId: string;

  @Prop({ required: false, type: String })
  experience: string;

  @Prop({ type: Array<Project> })
  projects: Project[];
}

export const DesignerSchema = SchemaFactory.createForClass(Designer);
