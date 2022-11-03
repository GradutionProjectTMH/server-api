import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DSchema } from '../../core/decorators/schema.decorator';

export type EnvironmentDocument = Environment & Document;

@DSchema()
export class Environment {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  environment: string;
}

export const EnvironmentSchema = SchemaFactory.createForClass(Environment);
