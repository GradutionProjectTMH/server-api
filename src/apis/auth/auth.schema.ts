
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuthDocument = Auth & Document;

@Schema({timestamps: true, versionKey: false})
export class Auth {
  @Prop()
  example1: string;

  @Prop()
  example2: number;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
  