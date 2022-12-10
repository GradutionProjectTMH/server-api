declare type UserField = 'id' | 'role';
export declare const User: (...dataOrPipes: (UserField | import("@nestjs/common").PipeTransform<any, any> | import("@nestjs/common").Type<import("@nestjs/common").PipeTransform<any, any>>)[]) => ParameterDecorator;
export {};
