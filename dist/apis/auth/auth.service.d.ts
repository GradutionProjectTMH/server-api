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
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { ROLE, USER_STATUS } from 'src/core/constants/enum';
import { User, UserDocument } from '../user/user.schema';
import { LoginByEmailDto, LoginByGoogleDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private readonly userModel;
    private jwtService;
    private readonly initializeApp;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService);
    loginByEmail(login: LoginByEmailDto): Promise<{
        token: string;
        id?: any;
        role: ROLE;
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
        avatar: string;
        status: USER_STATUS;
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
    loginByGoogle(data: LoginByGoogleDto): Promise<{
        token: string;
        id?: any;
        role: ROLE;
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
        avatar: string;
        status: USER_STATUS;
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
    register(registerDto: RegisterDto): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    checkToken(userId: string): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
