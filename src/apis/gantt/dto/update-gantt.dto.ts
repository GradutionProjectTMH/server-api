import { PartialType } from '@nestjs/swagger';
import { CreateganttDto } from './create-gantt.dto';

export class UpdateganttDto extends PartialType(CreateganttDto) {}
