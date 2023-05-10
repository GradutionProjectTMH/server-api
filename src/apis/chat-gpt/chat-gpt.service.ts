import { Injectable } from '@nestjs/common';
import { CreateChatGptDto } from './dto/create-chat-gpt.dto';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class ChatGptService {
  private openai: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });

    this.openai = new OpenAIApi(configuration);
  }

  async chat(createChatGptDto: CreateChatGptDto) {
    const response = await this.openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: createChatGptDto.messages,
      max_tokens: 500,
    });

    return response.data.choices[0];
  }
}
