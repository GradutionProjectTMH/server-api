import { Schema, SchemaOptions } from '@nestjs/mongoose';

export const DSchema = (options?: SchemaOptions) => {
  return Schema({ ...options, timestamps: true, versionKey: false });
};
