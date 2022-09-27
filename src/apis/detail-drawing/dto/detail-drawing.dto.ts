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

export class DetailDrawingDto {
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
  @IsEnum(DETAIL_DRAWING_STATUS)
  @EnumTransform(DETAIL_DRAWING_STATUS)
  status: DETAIL_DRAWING_STATUS;
}
