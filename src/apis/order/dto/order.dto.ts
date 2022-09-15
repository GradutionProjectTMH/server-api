import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ORDER_STATUS } from 'src/core/constants/enum';
import { Type } from 'class-transformer';
import { AddressDto } from '../../../base/dto/address.dto';
import { IsObjectId } from '../../../core/validations/is-object-id.validation';

class OrderProductDto {
  @ApiProperty()
  @IsOptional()
  @IsObjectId()
  productId: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  amount: number;
}
export class OrderDto {
  @ApiProperty({ type: [OrderProductDto] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => OrderProductDto)
  products: OrderProductDto[];

  @ApiProperty()
  @IsOptional()
  @IsObjectId()
  userId: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(ORDER_STATUS)
  status: ORDER_STATUS;

  @ApiProperty()
  @IsOptional()
  address: AddressDto;
}
