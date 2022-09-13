import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CommentDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  userId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  productId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ each: true })
  files: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  email: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  star: number;
}
