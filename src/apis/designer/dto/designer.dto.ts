import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { EnumTransform } from '../../../core/decorators/enum-transform.decorator';
import { TOOL_DESIGN } from '../../../utils/tool-design';

class Project {
  @ApiProperty({ required: false, enum: TOOL_DESIGN })
  @IsOptional()
  @IsEnum(TOOL_DESIGN)
  @EnumTransform(TOOL_DESIGN)
  tool: TOOL_DESIGN;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  url: string;
}

export class DesignerDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  experience: string;

  @ApiProperty({ required: false, type: [Project] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => Project)
  projects: Project[];
}
