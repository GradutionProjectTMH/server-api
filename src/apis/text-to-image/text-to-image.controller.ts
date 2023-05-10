import { Controller, Post, Body } from '@nestjs/common';
import { TextToImageService } from './text-to-image.service';
import { CreateTextToImageDto } from './dto/create-text-to-image.dto';

@Controller('text-to-image')
export class TextToImageController {
  constructor(private readonly textToImageService: TextToImageService) {}

  @Post()
  textToImage(@Body() createTextToImageDto: CreateTextToImageDto) {
    return this.textToImageService.textToImage(createTextToImageDto);
  }
}
