import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class BaseSchema {
  @Prop({ type: Date })
  createdAt?: Date;

  @Prop()
  updatedAt?: Date;

  @Prop({ type: Boolean })
  isDelete?: boolean;

  @Prop({ type: Date })
  deletedAt?: number;

  @Prop({ type: String })
  deleteBy?: string;
}
