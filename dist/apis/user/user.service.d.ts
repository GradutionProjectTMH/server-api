/// <reference types="multer" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/apis/user/user.schema';
import { UploadService } from '../upload/upload.service';
import { UserFilterDto } from './dto/user-filter.dto';
import { UserDto } from './dto/user.dto';
export declare class UserService {
    private readonly userModel;
    private readonly uploadService;
    constructor(userModel: Model<UserDocument>, uploadService: UploadService);
    getAll(filter: UserFilterDto): Promise<{
        totalPage: number;
        currentPage: number;
        data: (User & import("mongoose").Document<any, any, any> & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
    getById(id: string): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateProfile(data: UserDto, userId: string): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    uploadAvatar(userId: string, avatar: Express.Multer.File): Promise<{
        avatar: string;
        id?: any;
        role: import("../../core/constants/enum").ROLE;
        _id: any;
        __v?: any;
        createdAt?: Date;
        updatedAt?: Date;
        isDelete?: boolean;
        deletedAt?: number;
        deleteBy?: string;
        firstName: string;
        lastName: string;
        email: string;
        signupType: string;
        idToken: string;
        password: string;
        status: import("../../core/constants/enum").USER_STATUS;
        address: import("../../base/schemas/address.schema").Address;
        profile: {
            experience: string;
            projects: {
                tool: {
                    name: string;
                    logo: string;
                };
                url: string;
            }[];
        };
    }>;
}
