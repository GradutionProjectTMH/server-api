import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Address {
  @Prop({ type: String })
  code: string;

  @Prop({ type: String })
  state: string;

  @Prop({ type: String })
  country: string;

  @Prop({ type: String })
  city: string;

  @Prop({ type: String })
  district: string;

  @Prop({ type: String })
  street: string;

  @Prop({ type: String })
  detail: string;
}
