import { IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { COMMENT_SORT } from '../../../core/constants/enum';
import { PaginationDto } from '../../../base/dto/pagination.dto';

export class CommentFilterDto extends PaginationDto {
  @ApiProperty({ example: COMMENT_SORT.DESCENDING_STAR, enum: COMMENT_SORT })
  @IsOptional()
  @IsEnum(COMMENT_SORT)
  sort: COMMENT_SORT;
}
