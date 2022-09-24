import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { PRODUCT_STATUS } from 'src/core/constants/enum';
import { EnumTransform } from '../../../core/decorators/enum-transform.decorator';

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
  @IsNumberString()
  // @Transform((value) => Number(value))
  star: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  // @Transform((value) => Number(value))
  oldPrice: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
  // @Transform((value) => Number(value))
  price: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumberString()
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
  @IsEnum(PRODUCT_STATUS)
  @EnumTransform(PRODUCT_STATUS)
  status: PRODUCT_STATUS;
}
