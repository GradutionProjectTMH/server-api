import { ApiProperty } from '@nestjs/swagger';
import { PaginationDto } from '../../../base/dto/pagination.dto';
import { IsOptional, IsString } from 'class-validator';

export class HireFilterDto extends PaginationDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  typeOrder: 'my-drawing' | 'my-order';
}
