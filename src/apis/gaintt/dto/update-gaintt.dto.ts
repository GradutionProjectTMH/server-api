import { PartialType } from '@nestjs/swagger';
import { CreateGainttDto } from './create-gaintt.dto';

export class UpdateGainttDto extends PartialType(CreateGainttDto) {}
