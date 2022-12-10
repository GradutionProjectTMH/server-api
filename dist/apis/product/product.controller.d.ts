import { ROLE } from '../../core/constants/enum';
import { ProductFilterDto } from './dto/product-filter.dto';
import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getAll(filter: ProductFilterDto): Promise<{
        success: boolean;
        message: string;
    }>;
    getById(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    create(product: ProductDto, userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    updateById(id: string, product: ProductDto, userId: string, role: ROLE): Promise<{
        success: boolean;
        message: string;
    }>;
    deleteById(id: string, userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
