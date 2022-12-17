/// <reference types="multer" />
import { UserService } from 'src/apis/user/user.service';
import { UserFilterDto } from './dto/user-filter.dto';
import { UserDto } from './dto/user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getAll(filter: UserFilterDto): Promise<{
        success: boolean;
        message: string;
    }>;
    getById(userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
    uploadAvatar(userId: string, avatar: Express.Multer.File): Promise<{
        success: boolean;
        message: string;
    }>;
    updateById(body: UserDto, userId: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
