import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { TextRazorDto } from './dto/text-razor.dto';

@Injectable()
export class TextRazorService {
  private request = axios.create({
    baseURL: process.env.TEXT_RAZOR_ENDPOINT,
    headers: {
      'x-requested-with': '*',
      'X-TextRazor-Key': process.env.TEXT_RAZOR_API_KEY,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  constructor() {}

  async extract(textRazorDto: TextRazorDto) {
    const { text, extractors } = textRazorDto;

    const params = new URLSearchParams();
    params.append('text', text);
    params.append('extractors', extractors.join(','));

    const response = await this.request.post('/', params);
    return response.data;
  }
}
