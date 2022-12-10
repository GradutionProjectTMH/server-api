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
exports.FileFilterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const pagination_dto_1 = require("../../../base/dto/pagination.dto");
const enum_transform_decorator_1 = require("../../../core/decorators/enum-transform.decorator");
const is_object_id_validation_1 = require("../../../core/validations/is-object-id.validation");
const file_status_enum_1 = require("../enums/file-status.enum");
class FileFilterDto extends pagination_dto_1.PaginationDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, is_object_id_validation_1.IsObjectId)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FileFilterDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(file_status_enum_1.FILE_STATUS),
    (0, enum_transform_decorator_1.EnumTransform)(file_status_enum_1.FILE_STATUS),
    __metadata("design:type", String)
], FileFilterDto.prototype, "status", void 0);
exports.FileFilterDto = FileFilterDto;
//# sourceMappingURL=file-filter.dto.js.map