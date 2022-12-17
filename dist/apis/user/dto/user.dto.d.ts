import { AddressDto } from '../../../base/dto/address.dto';
import { ROLE, USER_STATUS } from '../../../core/constants/enum';
import { TOOL_DESIGN } from '../../../utils/tool-design';
declare class Project {
    tool: TOOL_DESIGN;
    url: string;
}
declare class ProfileDto {
    experience: string;
    projects: Project[];
}
export declare class UserDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: ROLE;
    status: USER_STATUS;
    address: AddressDto;
    profile: ProfileDto;
    wallet: string;
}
export {};
