import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { LIMIT, PAGE } from '../../core/constants/enum';

export class PaginationDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  limit: number = LIMIT;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  page: number = PAGE;
}
