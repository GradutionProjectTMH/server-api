import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsString, ValidateNested } from 'class-validator';
import { ChatCompletionRequestMessageRoleEnum } from 'openai';
import { EnumTransform } from 'src/core/decorators/enum-transform.decorator';

export class MessageDto {
  @ApiProperty({ type: String, enum: ChatCompletionRequestMessageRoleEnum })
  @IsEnum(ChatCompletionRequestMessageRoleEnum)
  @EnumTransform(ChatCompletionRequestMessageRoleEnum)
  role: ChatCompletionRequestMessageRoleEnum;

  @ApiProperty({ type: String })
  @IsString()
  content: string;
}

export class CreateChatGptDto {
  @ApiProperty({ type: [MessageDto] })
  @ValidateNested({ each: true })
  @Type(() => MessageDto)
  messages: MessageDto[];
}
