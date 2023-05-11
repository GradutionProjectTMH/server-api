import { Controller, Body, Post } from '@nestjs/common';
import { ganttService } from './gantt.service';
import { CreateganttDto } from './dto/create-gantt.dto';

@Controller('gantt')
export class ganttController {
  constructor(private readonly ganttService: ganttService) {}

  @Post()
  gantt(@Body() createganttDto: CreateganttDto) {
    return this.ganttService.gantt(createganttDto);
  }
}
