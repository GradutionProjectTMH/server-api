import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { EnumTransform } from '../../../core/decorators/enum-transform.decorator';
import { IsObjectId } from '../../../core/validations/is-object-id.validation';
import { PROJECT_STATUS } from '../enum/project.enum';

class Design2DDto {
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

class ExpectedMaterialDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  amount: number;
}

class RoomDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  amount: number;
}

class StepOne {
  @ApiProperty()
  @IsOptional()
  @IsObjectId()
  designerId: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ each: true })
  firstFloorDesigns: string[];

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

class StepTwo {}

export class ProjectDto {
  @ApiProperty({ type: Design2DDto })
  @IsOptional()
  @Type(() => Design2DDto)
  design2D: Design2DDto;

  @ApiProperty({ type: [ExpectedMaterialDto] })
  @IsOptional()
  @Type(() => ExpectedMaterialDto)
  expectedMaterial: ExpectedMaterialDto[];

  @ApiProperty({ type: [RoomDto] })
  @IsOptional()
  @Type(() => RoomDto)
  rooms: RoomDto[];

  @ApiProperty()
  @IsOptional()
  @IsEnum(PROJECT_STATUS)
  @EnumTransform(PROJECT_STATUS)
  status: PROJECT_STATUS;

  @ApiProperty({ type: StepOne })
  @IsOptional()
  @Type(() => StepOne)
  stepOne: StepOne;

  @ApiProperty({ type: StepTwo })
  @IsOptional()
  @Type(() => StepTwo)
  stepTwo: StepTwo;
}
