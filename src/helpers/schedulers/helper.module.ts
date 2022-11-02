import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CoinSchedulerModule } from './coin/coin.schedulers.module';

@Module({
  imports: [ScheduleModule.forRoot(), CoinSchedulerModule],
  controllers: [],
  providers: [],
})
export class HelperModule {}
