import { Module } from '@nestjs/common';
import { GainttService } from './gaintt.service';
import { GainttController } from './gaintt.controller';
import { ChatGptService } from 'src/apis/chat-gpt/chat-gpt.service';

@Module({
  controllers: [GainttController],
  providers: [GainttService, ChatGptService],
})
export class GainttModule {}
