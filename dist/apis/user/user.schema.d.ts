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
import { Document } from 'mongoose';
import { ROLE, USER_STATUS } from 'src/core/constants/enum';
import { Address } from '../../base/schemas/address.schema';
import { BaseSchema } from '../../base/schemas/base.schem';
export declare type UserDocument = User & Document;
declare class ToolDesign {
    name: string;
    logo: string;
}
declare class Project {
    tool: ToolDesign;
    url: string;
}
declare class Profile {
    experience: string;
    projects: Project[];
}
export declare class User extends BaseSchema {
    firstName: string;
    lastName: string;
    email: string;
    signupType: string;
    idToken: string;
    password: string;
    avatar: string;
    role: ROLE;
    status: USER_STATUS;
    address: Address;
    profile: Profile;
    wallet: string;
}
export declare const UserSchema: import("mongoose").Schema<User, import("mongoose").Model<User, any, any, any, any>, {}, {}, {}, {}, "type", User>;
export {};
