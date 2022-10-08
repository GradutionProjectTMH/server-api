import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { EnumTransform } from '../../../core/decorators/enum-transform.decorator';
import { FILE_STATUS } from '../enums/file-status.enum';

export class FileDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  location: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(FILE_STATUS)
  @EnumTransform(FILE_STATUS)
  status: FILE_STATUS;
}
