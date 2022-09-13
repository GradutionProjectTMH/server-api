import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { PRODUCT_STATUS } from 'src/core/constants/enum';
import { EnumTransform } from 'src/core/decorators/enum.decorator';

export class ProductDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  images: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  star: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  oldPrice: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  price: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
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
  // @EnumTransform(PRODUCT_STATUS)
  status: PRODUCT_STATUS;
}
