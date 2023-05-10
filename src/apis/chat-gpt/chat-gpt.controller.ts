import { Controller, Body, Post } from '@nestjs/common';
import { ChatGptService } from './chat-gpt.service';
import { CreateChatGptDto } from './dto/create-chat-gpt.dto';

@Controller('chat-gpt')
export class ChatGptController {
  constructor(private readonly chatGptService: ChatGptService) {}

  @Post()
  chat(@Body() createChatGptDto: CreateChatGptDto) {
    return this.chatGptService.chat(createChatGptDto);
  }
}
