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
        _id: any;
        __v?: any;
        id?: any;
        firstName: string;
        lastName: string;
        email: string;
        signupType: string;
        idToken: string;
        password: string;
        avatar: string;
        role: ROLE;
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
        wallet: string;
        createdAt?: Date;
        updatedAt?: Date;
        isDelete?: boolean;
        deletedAt?: number;
        deleteBy?: string;
    }>;
    loginByGoogle(data: LoginByGoogleDto): Promise<{
        token: string;
        _id: any;
        __v?: any;
        id?: any;
        firstName: string;
        lastName: string;
        email: string;
        signupType: string;
        idToken: string;
        password: string;
        avatar: string;
        role: ROLE;
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
        wallet: string;
        createdAt?: Date;
        updatedAt?: Date;
        isDelete?: boolean;
        deletedAt?: number;
        deleteBy?: string;
    }>;
    register(registerDto: RegisterDto): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    checkToken(userId: string): Promise<User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
