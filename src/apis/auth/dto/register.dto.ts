import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ROLE } from 'src/core/constants/enum';
import { EnumTransform } from '../../../core/decorators/enum-transform.decorator';

export class RegisterDto {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty({ enum: ROLE })
  @IsEnum(ROLE)
  @IsOptional()
  @EnumTransform(ROLE)
  role: ROLE = ROLE.USER;
}
