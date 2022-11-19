import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDto } from '../../../base/dto/pagination.dto';
import { ROLE } from '../../../core/constants/enum';
import { EnumTransform } from '../../../core/decorators/enum-transform.decorator';

export class UserFilterDto extends PaginationDto {
  @ApiProperty({ required: false, enum: ROLE })
  @IsOptional()
  @IsEnum(ROLE)
  @EnumTransform(ROLE)
  typeUser: ROLE;
}
