import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CoinModule } from '../../../apis/coin/coin.module';
import { CoinSchedulerService } from './coin.schedulers.service';

@Module({
  imports: [HttpModule, CoinModule],
  controllers: [],
  providers: [CoinSchedulerService],
})
export class CoinSchedulerModule {}
