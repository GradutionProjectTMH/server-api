import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDto } from '../../../base/dto/pagination.dto';
import { EnumTransform } from '../../../core/decorators/enum-transform.decorator';
import { IsObjectId } from '../../../core/validations/is-object-id.validation';
import { FILE_STATUS } from '../enums/file-status.enum';

export class FileFilterDto extends PaginationDto {
  @ApiProperty({ required: false })
  @IsObjectId()
  @IsOptional()
  userId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(FILE_STATUS)
  @EnumTransform(FILE_STATUS)
  status: FILE_STATUS;
}
