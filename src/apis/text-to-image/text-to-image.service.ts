import { Injectable } from '@nestjs/common';
import { CreateTextToImageDto } from './dto/create-text-to-image.dto';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class TextToImageService {
  constructor(private readonly httpService: HttpService) {}

  async textToImage(createTextToImageDto: CreateTextToImageDto) {
    if (!createTextToImageDto.prompt) {
      throw new Error('Prompt is required');
    }

    const URL = 'https://stablediffusionapi.com/api/v3/text2img';
    const response = await this.httpService.axiosRef.post(
      URL,
      {
        key: process.env.STABLE_DIFFUSION_API_KEY,
        prompt: createTextToImageDto.prompt,
        negative_prompt: createTextToImageDto.negativePrompt,
        width: '1000',
        height: '1000',
        samples: createTextToImageDto.amount,
        num_inference_steps: '20',
        safety_checker: 'no',
        enhance_prompt: 'yes',
        seed: null,
        guidance_scale: 7.5,
        webhook: null,
        track_id: null,
      },
      {
        timeout: 100000,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  }
}
