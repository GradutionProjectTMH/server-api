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
exports.ProjectDto = exports.StepTwo = exports.StepOne = exports.CoHomeLinkDto = exports.RoomDto = exports.ExpectedMaterialDto = exports.Design2DDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const enum_transform_decorator_1 = require("../../../core/decorators/enum-transform.decorator");
const is_object_id_validation_1 = require("../../../core/validations/is-object-id.validation");
const project_enum_1 = require("../enum/project.enum");
class Design2DDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Design2DDto.prototype, "house_boundary", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Design2DDto.prototype, "width", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Design2DDto.prototype, "height", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Design2DDto.prototype, "boundaryImg", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Design2DDto.prototype, "crossSectionImg", void 0);
exports.Design2DDto = Design2DDto;
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
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RoomDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RoomDto.prototype, "amount", void 0);
exports.RoomDto = RoomDto;
class CoHomeLinkDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CoHomeLinkDto.prototype, "co_home_link", void 0);
exports.CoHomeLinkDto = CoHomeLinkDto;
class StepOne {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, is_object_id_validation_1.IsObjectId)(),
    __metadata("design:type", String)
], StepOne.prototype, "designerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [CoHomeLinkDto] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => CoHomeLinkDto),
    __metadata("design:type", Array)
], StepOne.prototype, "firstFloorDesigns", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], StepOne.prototype, "numDrafts", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], StepOne.prototype, "audittedTimes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], StepOne.prototype, "status", void 0);
exports.StepOne = StepOne;
class StepTwo {
}
exports.StepTwo = StepTwo;
class ProjectDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: Design2DDto }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Design2DDto),
    __metadata("design:type", Design2DDto)
], ProjectDto.prototype, "design2D", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [ExpectedMaterialDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => ExpectedMaterialDto),
    __metadata("design:type", Array)
], ProjectDto.prototype, "expectedMaterial", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [RoomDto] }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => RoomDto),
    __metadata("design:type", Array)
], ProjectDto.prototype, "rooms", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(project_enum_1.PROJECT_STATUS),
    (0, enum_transform_decorator_1.EnumTransform)(project_enum_1.PROJECT_STATUS),
    __metadata("design:type", Number)
], ProjectDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: StepOne }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => StepOne),
    __metadata("design:type", StepOne)
], ProjectDto.prototype, "stepOne", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: StepTwo }),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => StepTwo),
    __metadata("design:type", StepTwo)
], ProjectDto.prototype, "stepTwo", void 0);
exports.ProjectDto = ProjectDto;
//# sourceMappingURL=project.dto.js.map