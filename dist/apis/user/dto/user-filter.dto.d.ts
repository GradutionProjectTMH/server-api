import { PaginationDto } from '../../../base/dto/pagination.dto';
import { ROLE } from '../../../core/constants/enum';
export declare class UserFilterDto extends PaginationDto {
    typeUser: ROLE;
}
