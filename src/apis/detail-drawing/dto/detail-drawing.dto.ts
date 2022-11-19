import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { EnumTransform } from '../../../core/decorators/enum-transform.decorator';
import { DETAIL_DRAWING_STATUS, ROOM_TYPE } from '../enum/detail-drawing.enum';

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
  @IsEnum(ROOM_TYPE)
  @EnumTransform(ROOM_TYPE)
  name: ROOM_TYPE;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  amount: number;
}

class BountyReward {
  @ApiProperty()
  @IsOptional()
  @IsString()
  coinId: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  amount: number;
}

export class DetailDrawingDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  houseBoundary: number;

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

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  numberOfFloors: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  heightOfEachFloors: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  themeColor: string;

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

  @ApiProperty({ type: [BountyReward] })
  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => BountyReward)
  bountyRewards: BountyReward[];

  @ApiProperty()
  @IsOptional()
  @IsObject()
  additionalInformation: Record<string, any>;

  @ApiProperty({ type: DETAIL_DRAWING_STATUS, enum: DETAIL_DRAWING_STATUS })
  @IsOptional()
  @IsEnum(DETAIL_DRAWING_STATUS)
  @EnumTransform(DETAIL_DRAWING_STATUS)
  status: DETAIL_DRAWING_STATUS;
}
