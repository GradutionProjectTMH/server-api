import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ORDER_STATUS } from 'src/core/constants/enum';
import { PaginationDto } from '../../../base/dto/pagination.dto';

export class OrderFilterDto extends PaginationDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  q: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(ORDER_STATUS)
  status: ORDER_STATUS;
}
