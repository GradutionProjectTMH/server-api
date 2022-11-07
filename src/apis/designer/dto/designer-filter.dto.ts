import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../base/dto/pagination.dto';

export class DesignerFilterDto extends PaginationDto {
  // @ApiProperty({ required: false })
  // @IsOptional()
  // @IsString()
  // name: string;
}
