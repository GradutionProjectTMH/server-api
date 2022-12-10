import { HttpService } from '@nestjs/axios';
import { CoinService } from '../../../apis/coin/coin.service';
export declare class CoinSchedulerService {
    private readonly httpService;
    private readonly coinService;
    constructor(httpService: HttpService, coinService: CoinService);
    private readonly logger;
    handleCron(): Promise<void>;
    private getInFo;
    private getListingsLatest;
}
