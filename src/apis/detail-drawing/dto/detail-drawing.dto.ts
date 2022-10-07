import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { EnumTransform } from '../../../core/decorators/enum-transform.decorator';
import { DETAIL_DRAWING_STATUS } from '../enum/detail-drawing.enum';

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

  @ApiProperty({ type: DETAIL_DRAWING_STATUS, enum: DETAIL_DRAWING_STATUS })
  @IsOptional()
  @IsEnum(DETAIL_DRAWING_STATUS)
  @EnumTransform(DETAIL_DRAWING_STATUS)
  status: DETAIL_DRAWING_STATUS;
}
