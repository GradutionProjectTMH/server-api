import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvironmentController } from 'src/apis/environment/environment.controller';
import { EnvironmentService } from 'src/apis/environment/environment.service';
import { Environment, EnvironmentSchema } from './environment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Environment.name, schema: EnvironmentSchema },
    ]),
  ],
  controllers: [EnvironmentController],
  providers: [EnvironmentService],
})
export class EnvironmentModule {}
