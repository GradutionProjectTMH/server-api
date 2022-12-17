import { Model } from 'mongoose';
import { Comment, CommentDocument } from './comment.schema';
import { CommentDto } from './dto/comment.dto';
export declare class CommentService {
    private readonly commentModel;
    constructor(commentModel: Model<CommentDocument>);
    getAll(): Promise<Omit<Comment & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }, never>[]>;
    getById(id: string): Promise<Comment & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    create(data: CommentDto): Promise<Comment & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateById(id: string, data: CommentDto): Promise<Comment & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    deleteById(id: string): Promise<Comment & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
