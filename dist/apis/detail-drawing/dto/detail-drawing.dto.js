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
exports.DetailDrawingDto = exports.RoomDto = exports.ExpectedMaterialDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const enum_transform_decorator_1 = require("../../../core/decorators/enum-transform.decorator");
const detail_drawing_enum_1 = require("../enum/detail-drawing.enum");
class ExpectedMaterialDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ExpectedMaterialDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ExpectedMaterialDto.prototype, "amount", void 0);
exports.ExpectedMaterialDto = ExpectedMaterialDto;
class RoomDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(detail_drawing_enum_1.ROOM_TYPE),
    (0, enum_transform_decorator_1.EnumTransform)(detail_drawing_enum_1.ROOM_TYPE),
    __metadata("design:type", String)
], RoomDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RoomDto.prototype, "amount", void 0);
exports.RoomDto = RoomDto;
class BountyReward {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BountyReward.prototype, "coinId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BountyReward.prototype, "amount", void 0);
class DetailDrawingDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DetailDrawingDto.prototype, "houseBoundary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DetailDrawingDto.prototype, "width", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DetailDrawingDto.prototype, "height", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DetailDrawingDto.prototype, "boundaryImg", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DetailDrawingDto.prototype, "crossSectionImg", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DetailDrawingDto.prototype, "numberOfFloors", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], DetailDrawingDto.prototype, "heightOfEachFloors", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DetailDrawingDto.prototype, "themeColor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ExpectedMaterialDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => ExpectedMaterialDto),
    __metadata("design:type", Array)
], DetailDrawingDto.prototype, "expectedMaterial", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [RoomDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => RoomDto),
    __metadata("design:type", Array)
], DetailDrawingDto.prototype, "rooms", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [BountyReward] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => BountyReward),
    __metadata("design:type", Array)
], DetailDrawingDto.prototype, "bountyRewards", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", Object)
], DetailDrawingDto.prototype, "additionalInformation", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: detail_drawing_enum_1.DETAIL_DRAWING_STATUS, enum: detail_drawing_enum_1.DETAIL_DRAWING_STATUS }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(detail_drawing_enum_1.DETAIL_DRAWING_STATUS),
    (0, enum_transform_decorator_1.EnumTransform)(detail_drawing_enum_1.DETAIL_DRAWING_STATUS),
    __metadata("design:type", String)
], DetailDrawingDto.prototype, "status", void 0);
exports.DetailDrawingDto = DetailDrawingDto;
//# sourceMappingURL=detail-drawing.dto.js.map