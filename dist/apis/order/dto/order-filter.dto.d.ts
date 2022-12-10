import { ORDER_STATUS } from 'src/core/constants/enum';
import { PaginationDto } from '../../../base/dto/pagination.dto';
export declare class OrderFilterDto extends PaginationDto {
    q: string;
    status: ORDER_STATUS;
}
