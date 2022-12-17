import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ROLE, USER_STATUS } from 'src/core/constants/enum';
import { DSchema } from 'src/core/decorators/schema.decorator';
import { Address } from '../../base/schemas/address.schema';
import { BaseSchema } from '../../base/schemas/base.schem';
import { SIGNUP_TYPE } from './enum/user.enum';

export type UserDocument = User & Document;

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

@Schema()
class Profile {
  @Prop({ required: false, type: String })
  experience: string;

  @Prop({ type: Array<Project> })
  projects: Project[];
}

@DSchema()
export class User extends BaseSchema {
  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: false })
  lastName: string;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true, enum: SIGNUP_TYPE })
  signupType: string;

  @Prop({ type: String, required: false })
  idToken: string;

  @Prop({ type: String, required: false })
  password: string;

  @Prop({ type: String, required: false })
  avatar: string;

  @Prop({ type: String, enum: ROLE, required: true })
  role: ROLE;

  @Prop({ type: String, enum: USER_STATUS, required: true })
  status: USER_STATUS;

  @Prop({ type: Address })
  address: Address;

  @Prop({ type: Profile })
  profile: Profile;

  @Prop({ type: String })
  wallet: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
