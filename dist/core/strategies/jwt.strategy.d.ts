import { Strategy } from 'passport-jwt';
import { UserDocument } from '../../apis/user/user.schema';
import { Model } from 'mongoose';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly userModel;
    constructor(userModel: Model<UserDocument>);
    validate(payload: any): Promise<{
        id: any;
        role: any;
    }>;
}
export {};
