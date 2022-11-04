import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Coin } from '../../../apis/coin/coin.schema';
import { CoinService } from '../../../apis/coin/coin.service';
import { CoinDto } from '../../../apis/coin/dto/coin.dto';
import { CoinListingsLatest } from './interfaces/coin-response.interface';

@Injectable()
export class CoinSchedulerService {
  constructor(
    private readonly httpService: HttpService,
    private readonly coinService: CoinService,
  ) {}

  private readonly logger = new Logger(CoinSchedulerService.name);

  @Cron(CronExpression.EVERY_10_HOURS)
  async handleCron() {
    try {
      const coins = await this.coinService.getAll();
      if (!coins || coins.length === 0) {
        return this.logger.debug('Data in db is empty');
      }

      const listingsLatest = await this.getListingsLatest();

      const newCoins: Coin[] = coins.map((e) => {
        return {
          ...e,
          price:
            listingsLatest.filter((l) => l.symbol === e.symbol)[0]?.quote.USD
              .price || e.price,
        };
      });

      await this.coinService.insertMany(newCoins);

      return this.logger.debug('Crawl data success');
    } catch (error) {
      return this.logger.error(error);
    }
  }

  private async getInFo() {
    try {
      const res = await this.httpService.axiosRef.get(
        'https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?symbol=ETH,BTC&aux=urls,logo,description',
        {
          headers: {
            'X-CMC_PRO_API_KEY': process.env.KEY_COIN_MARKET_CAP,
          },
        },
      );

      const result: CoinDto[] = res.data;
      return result;
    } catch (error) {
      throw new Error('Function [getInFo]: ' + error);
    }
  }

  private async getListingsLatest() {
    try {
      const res = await this.httpService.axiosRef.get(
        'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?convert=USD',
        {
          headers: {
            'X-CMC_PRO_API_KEY': process.env.KEY_COIN_MARKET_CAP,
          },
        },
      );

      const result: CoinListingsLatest[] = res.data.data;

      return result;
    } catch (error) {
      throw new Error('Function [getListingsLatest]: ' + error);
    }
  }
}
