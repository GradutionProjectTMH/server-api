import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { EnumTransform } from '../../../core/decorators/enum-transform.decorator';
import { IsObjectId } from '../../../core/validations/is-object-id.validation';
import { PROJECT_STATUS } from '../enum/project.enum';

export class Design2DDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  house_boundary: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  width: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  height: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  boundaryImg: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  crossSectionImg: string;
}

export class ExpectedMaterialDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  amount: number;
}

export class RoomDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  amount: number;
}

export class CoHomeLinkDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  co_home_link: string;
}

export class StepOne {
  @ApiProperty()
  @IsOptional()
  @IsObjectId()
  designerId: string;

  @ApiProperty({ type: [CoHomeLinkDto] })
  @IsOptional()
  @Type(() => CoHomeLinkDto)
  firstFloorDesigns: CoHomeLinkDto[];

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  numDrafts: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  audittedTimes: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  status: number;
}

export class StepTwo {}

export class ProjectDto {
  @ApiProperty({ type: Design2DDto })
  @ValidateNested()
  @IsOptional()
  @Type(() => Design2DDto)
  design2D: Design2DDto;

  @ApiProperty({ type: [ExpectedMaterialDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => ExpectedMaterialDto)
  expectedMaterial: ExpectedMaterialDto[];

  @ApiProperty({ type: [RoomDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => RoomDto)
  rooms: RoomDto[];

  @ApiProperty()
  @IsOptional()
  @IsEnum(PROJECT_STATUS)
  @EnumTransform(PROJECT_STATUS)
  status: PROJECT_STATUS;

  @ApiProperty({ type: StepOne })
  @ValidateNested()
  @IsOptional()
  @Type(() => StepOne)
  stepOne: StepOne;

  @ApiProperty({ type: StepTwo })
  @ValidateNested()
  @IsOptional()
  @Type(() => StepTwo)
  stepTwo: StepTwo;
}
