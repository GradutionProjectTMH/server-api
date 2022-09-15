import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ROLE, USER_STATUS } from 'src/core/constants/enum';
import { DSchema } from 'src/core/decorators/schema.decorator';
import { BaseSchema } from '../../base/base.schema';
import { Address } from '../../base/schemas/address.schema';

export type UserDocument = User & Document;

@DSchema()
export class User extends BaseSchema {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, enum: ROLE, required: true })
  role: ROLE;

  @Prop({ type: String, enum: USER_STATUS, required: true })
  status: USER_STATUS;

  @Prop({ type: Address })
  address: Address;
}

export const UserSchema = SchemaFactory.createForClass(User);
