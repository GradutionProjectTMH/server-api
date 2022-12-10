import { ROLE } from '../../core/constants/enum';
import { OrderFilterDto } from './dto/order-filter.dto';
import { OrderDto } from './dto/order.dto';
import { OrderService } from './order.service';
export declare class OrderController {
    private readonly orderService;
    constructor(orderService: OrderService);
    getAllByUser(filter: OrderFilterDto): Promise<{
        success: boolean;
        message: string;
    }>;
    getBySeller(userId: string, filter: OrderFilterDto): Promise<{
        success: boolean;
        message: string;
    }>;
    getByUser(userId: string, filter: OrderFilterDto): Promise<{
        success: boolean;
        message: string;
    }>;
    getById(id: string, userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    create(data: OrderDto, userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    updateById(id: string, data: OrderDto, userId: string, role: ROLE): Promise<{
        success: boolean;
        message: string;
    }>;
    deleteById(id: string, userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
