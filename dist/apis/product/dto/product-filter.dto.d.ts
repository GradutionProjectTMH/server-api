import { PRODUCT_SORT } from '../../../core/constants/enum';
import { PaginationDto } from '../../../base/dto/pagination.dto';
export declare class ProductFilterDto extends PaginationDto {
    name: string;
    minPrice: number;
    maxPrice: number;
    sortBy: PRODUCT_SORT;
}
