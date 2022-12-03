import { Module } from '@nestjs/common';
import { TextRazorController } from './text-razor.controller';
import { TextRazorService } from './text-razor.service';

@Module({
  imports: [],
  controllers: [TextRazorController],
  providers: [TextRazorService],
})
export class TextRazorModule {}
