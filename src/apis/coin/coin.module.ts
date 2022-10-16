import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoinController } from 'src/apis/coin/coin.controller';
import { CoinService } from 'src/apis/coin/coin.service';
import { Coin, CoinSchema } from 'src/apis/coin/coin.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Coin.name, schema: CoinSchema }])],
  controllers: [CoinController],
  providers: [CoinService],
})

export class CoinModule {}
