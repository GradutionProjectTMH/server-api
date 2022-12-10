import { COMMENT_SORT } from '../../../core/constants/enum';
import { PaginationDto } from '../../../base/dto/pagination.dto';
export declare class CommentFilterDto extends PaginationDto {
    sort: COMMENT_SORT;
}
