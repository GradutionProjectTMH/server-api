import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class TransactionDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  from: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  to: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  method: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  hash: string;
}
