import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { AddressDto } from '../../../base/dto/address.dto';
import { ROLE, USER_STATUS } from '../../../core/constants/enum';
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

class ProfileDto {
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

export class UserDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  password: string;

  @ApiProperty()
  @IsEnum(ROLE)
  @IsOptional()
  @EnumTransform(ROLE)
  role: ROLE;

  @ApiProperty()
  @IsEnum(USER_STATUS)
  @IsOptional()
  @EnumTransform(USER_STATUS)
  status: USER_STATUS;

  @ApiProperty()
  @ValidateNested()
  @Type(() => AddressDto)
  @IsOptional()
  address: AddressDto;

  @ApiProperty({ type: ProfileDto })
  @ValidateNested()
  @Type(() => ProfileDto)
  @IsOptional()
  profile: ProfileDto;
}
