import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  limit: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  page: number;
}
