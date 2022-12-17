"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const address_dto_1 = require("../../../base/dto/address.dto");
const enum_1 = require("../../../core/constants/enum");
const enum_transform_decorator_1 = require("../../../core/decorators/enum-transform.decorator");
const tool_design_1 = require("../../../utils/tool-design");
class Project {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, enum: tool_design_1.TOOL_DESIGN }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(tool_design_1.TOOL_DESIGN),
    (0, enum_transform_decorator_1.EnumTransform)(tool_design_1.TOOL_DESIGN),
    __metadata("design:type", String)
], Project.prototype, "tool", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Project.prototype, "url", void 0);
class ProfileDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ProfileDto.prototype, "experience", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: [Project] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => Project),
    __metadata("design:type", Array)
], ProfileDto.prototype, "projects", void 0);
class UserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(enum_1.ROLE),
    (0, class_validator_1.IsOptional)(),
    (0, enum_transform_decorator_1.EnumTransform)(enum_1.ROLE),
    __metadata("design:type", String)
], UserDto.prototype, "role", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(enum_1.USER_STATUS),
    (0, class_validator_1.IsOptional)(),
    (0, enum_transform_decorator_1.EnumTransform)(enum_1.USER_STATUS),
    __metadata("design:type", String)
], UserDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => address_dto_1.AddressDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", address_dto_1.AddressDto)
], UserDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: ProfileDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => ProfileDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", ProfileDto)
], UserDto.prototype, "profile", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserDto.prototype, "wallet", void 0);
exports.UserDto = UserDto;
//# sourceMappingURL=user.dto.js.map