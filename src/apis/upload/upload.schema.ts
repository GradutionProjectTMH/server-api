import { Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { BaseSchema } from '../../base/schemas/base.schem';
import { DSchema } from '../../core/decorators/schema.decorator';
import { User } from '../user/user.schema';
import { FILE_STATUS } from './enums/file-status.enum';

export type UploadDocument = Upload & Document;

@DSchema()
export class Upload extends BaseSchema {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  userId: string;

  @Prop({ type: String })
  location: string;

  @Prop({ type: String })
  etag: string;

  @Prop({ type: String })
  bucket: string;

  @Prop({ type: String })
  key: string;

  @Prop({ type: String, enum: FILE_STATUS })
  status: FILE_STATUS;
}

export const UploadSchema = SchemaFactory.createForClass(Upload);
