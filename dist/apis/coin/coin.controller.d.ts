import { CoinService } from './coin.service';
import { CoinDto } from './dto/coin.dto';
export declare class CoinController {
    private readonly coinService;
    constructor(coinService: CoinService);
    getAll(): Promise<{
        success: boolean;
        message: string;
    }>;
    getById(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    create(body: CoinDto): Promise<{
        success: boolean;
        message: string;
    }>;
    updateById(id: string, body: CoinDto): Promise<{
        success: boolean;
        message: string;
    }>;
    deleteById(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
