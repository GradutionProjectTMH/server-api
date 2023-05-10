import { Controller, Body, Post } from '@nestjs/common';
import { GainttService } from './gaintt.service';
import { CreateGainttDto } from './dto/create-gaintt.dto';

@Controller('gaintt')
export class GainttController {
  constructor(private readonly gainttService: GainttService) {}

  @Post()
  gaintt(@Body() createGainttDto: CreateGainttDto) {
    return this.gainttService.gaintt(createGainttDto);
  }
}
