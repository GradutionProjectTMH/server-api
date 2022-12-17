/// <reference types="multer" />
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
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        role: import("../../core/constants/enum").ROLE;
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
        wallet: string;
        signupType: string;
        idToken: string;
        createdAt?: Date;
        updatedAt?: Date;
        isDelete?: boolean;
        deletedAt?: number;
        deleteBy?: string;
        _id: any;
        __v?: any;
        id?: any;
    }>;
}
