import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { EnumTransform } from '../../../core/decorators/enum-transform.decorator';
import { IsObjectId } from '../../../core/validations/is-object-id.validation';
import { STATUS_HIRE } from '../enum/hire.enum';

class ItemDesign {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsUrl()
  image: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsUrl()
  coHomeUrl: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isChoose: boolean;
}

class ItemFloorDesign {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  floor: number;

  @ApiProperty({ type: [ItemDesign] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ItemDesign)
  designs: ItemDesign[];
}

export class HireDto {
  @ApiProperty()
  @IsOptional()
  @IsObjectId()
  userId: string;

  @ApiProperty()
  @IsOptional()
  @IsObjectId()
  designerId: string;

  @ApiProperty()
  @IsOptional()
  @IsObjectId()
  detailDrawing: string;

  @ApiProperty({ type: [ItemFloorDesign] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ItemFloorDesign)
  floorDesigns: ItemFloorDesign[];

  @ApiProperty({ type: [ItemDesign] })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ItemDesign)
  houseDesigns: ItemDesign[];

  @ApiProperty({ enum: STATUS_HIRE })
  @IsOptional()
  @IsEnum(STATUS_HIRE)
  @EnumTransform(STATUS_HIRE)
  status: STATUS_HIRE;
}
