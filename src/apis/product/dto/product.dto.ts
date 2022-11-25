import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { PRODUCT_STATUS } from 'src/core/constants/enum';
import { EnumTransform } from '../../../core/decorators/enum-transform.decorator';
import { TYPE_PRODUCT } from '../enum/product.enu';
class VerifyDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  data: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  owner: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  paymentToken: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  bounty: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  verifyBy: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  verifiedAt: Date;
}
export class ProductDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ each: true })
  images: string[] = [];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  // @Transform((value) => Number(value))
  star: number;

  @ApiProperty({ type: TYPE_PRODUCT, enum: TYPE_PRODUCT, required: false })
  @IsOptional()
  @IsEnum(TYPE_PRODUCT)
  @EnumTransform(TYPE_PRODUCT)
  type: TYPE_PRODUCT;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  // @Transform((value) => Number(value))
  oldPrice: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  // @Transform((value) => Number(value))
  price: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  // @Transform((value) => Number(value))
  sale: number;

  // @Prop({ type: String, required: true })
  // categories: [string];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ required: false })
  @IsOptional()
  verify: Record<string, any>;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(PRODUCT_STATUS)
  @EnumTransform(PRODUCT_STATUS)
  status: PRODUCT_STATUS;
}
