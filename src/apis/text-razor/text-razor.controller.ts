import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { responseError, responseSuccess } from '../../base/base.controller';
import { TextRazorDto } from './dto/text-razor.dto';
import { TextRazorService } from './text-razor.service';

@ApiTags('text-razor')
@Controller('text-razor')
export class TextRazorController {
  constructor(private readonly textRazorService: TextRazorService) {}

  @ApiOperation({ summary: 'Get all transaction' })
  @Post()
  async extract(@Body() textRazorDto: TextRazorDto) {
    try {
      const data = await this.textRazorService.extract(textRazorDto);
      return responseSuccess(data);
    } catch (error) {
      console.log(error.message);
      return responseError(error.message);
    }
  }
}
