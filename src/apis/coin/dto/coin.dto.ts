import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CoinDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  symbol: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  price: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  icon: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  color: string;
}
