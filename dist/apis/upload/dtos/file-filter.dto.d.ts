import { PaginationDto } from '../../../base/dto/pagination.dto';
import { FILE_STATUS } from '../enums/file-status.enum';
export declare class FileFilterDto extends PaginationDto {
    userId: string;
    status: FILE_STATUS;
}
