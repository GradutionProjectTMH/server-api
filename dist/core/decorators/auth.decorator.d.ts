import { ROLE } from '../constants/enum';
export declare function Auth(...roles: ROLE[]): <TFunction extends Function, Y>(target: object | TFunction, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
