import { Module } from '@nestjs/common';
import { ganttService } from './gantt.service';
import { ganttController } from './gantt.controller';
import { ChatGptService } from 'src/apis/chat-gpt/chat-gpt.service';

@Module({
  controllers: [ganttController],
  providers: [ganttService, ChatGptService],
})
export class ganttModule {}
