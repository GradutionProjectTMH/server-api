import { Module } from '@nestjs/common';
import { TextToImageService } from './text-to-image.service';
import { TextToImageController } from './text-to-image.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [TextToImageController],
  providers: [TextToImageService],
})
export class TextToImageModule {}
