import { CommentService } from './comment.service';
import { CommentFilterDto } from './dto/comment-filter.dto';
import { CommentDto } from './dto/comment.dto';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    getAll(filter: CommentFilterDto): Promise<{
        success: boolean;
        message: string;
    }>;
    getById(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
    create(data: CommentDto): Promise<{
        success: boolean;
        message: string;
    }>;
    updateById(id: string, data: CommentDto): Promise<{
        success: boolean;
        message: string;
    }>;
    deleteById(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
