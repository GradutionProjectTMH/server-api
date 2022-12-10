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
exports.HireDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const enum_transform_decorator_1 = require("../../../core/decorators/enum-transform.decorator");
const is_object_id_validation_1 = require("../../../core/validations/is-object-id.validation");
const hire_enum_1 = require("../enum/hire.enum");
class ItemDesign {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], ItemDesign.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], ItemDesign.prototype, "coHomeUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ItemDesign.prototype, "isChoose", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], ItemDesign.prototype, "materials", void 0);
class ItemFloorDesign {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ItemFloorDesign.prototype, "floor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ItemDesign] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ItemDesign),
    __metadata("design:type", Array)
], ItemFloorDesign.prototype, "designs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ItemFloorDesign.prototype, "status", void 0);
class ItemHouseDesign {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ItemDesign] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ItemDesign),
    __metadata("design:type", Array)
], ItemHouseDesign.prototype, "designs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], ItemHouseDesign.prototype, "status", void 0);
class HireDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, is_object_id_validation_1.IsObjectId)(),
    __metadata("design:type", String)
], HireDto.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, is_object_id_validation_1.IsObjectId)(),
    __metadata("design:type", String)
], HireDto.prototype, "designerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, is_object_id_validation_1.IsObjectId)(),
    __metadata("design:type", String)
], HireDto.prototype, "detailDrawingId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ItemFloorDesign] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ItemFloorDesign),
    __metadata("design:type", Array)
], HireDto.prototype, "floorDesigns", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ItemHouseDesign] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ItemHouseDesign),
    __metadata("design:type", Array)
], HireDto.prototype, "houseDesigns", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: hire_enum_1.STATUS_HIRE }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(hire_enum_1.STATUS_HIRE),
    (0, enum_transform_decorator_1.EnumTransform)(hire_enum_1.STATUS_HIRE),
    __metadata("design:type", String)
], HireDto.prototype, "status", void 0);
exports.HireDto = HireDto;
//# sourceMappingURL=hire.dto.js.map