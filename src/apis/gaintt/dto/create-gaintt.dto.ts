import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateGainttDto {
  @ApiProperty({ type: Number, example: 15 })
  @IsNumber()
  @IsNotEmpty()
  length: number;

  @ApiProperty({ type: Number, example: 7 })
  @IsNotEmpty()
  @IsNumber()
  with: number;

  @ApiProperty({ type: Number, example: 3 })
  @IsNotEmpty()
  @IsNumber()
  height: number;

  @ApiProperty({ type: Number, example: 3 })
  @IsNotEmpty()
  @IsNumber()
  floor: number;

  @ApiProperty({ type: String, example: 'Đà Nẵng' })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({ type: Number, example: 460000 })
  @IsNotEmpty()
  @IsNumber()
  laborCost: number;

  @ApiProperty({ type: Number, example: 200 })
  @IsNotEmpty()
  @IsNumber()
  estimate: number;

  @ApiProperty({ type: Number, example: 20 })
  @IsNotEmpty()
  @IsNumber()
  laborAmount: number;
}
