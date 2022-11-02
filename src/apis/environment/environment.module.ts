import { Module } from '@nestjs/common';
import { EnvironmentController } from 'src/apis/environment/environment.controller';
import { EnvironmentService } from 'src/apis/environment/environment.service';

@Module({
  controllers: [EnvironmentController],
  providers: [EnvironmentService],
})
export class EnvironmentModule {}
