import { TransactionService } from 'src/apis/transaction/transaction.service';
import { TransactionDto } from './dto/transaction.dto';
export declare class TransactionController {
    private readonly transactionService;
    constructor(transactionService: TransactionService);
    getAll(): Promise<{
        success: boolean;
        message: string;
    }>;
    getById(id: string, userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    create(body: TransactionDto, userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    updateById(id: string, body: TransactionDto, userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    deleteById(id: string, userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
