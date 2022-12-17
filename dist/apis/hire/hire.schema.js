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
exports.HireSchema = exports.Hire = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schema_decorator_1 = require("../../core/decorators/schema.decorator");
const detail_drawing_schema_1 = require("../detail-drawing/detail-drawing.schema");
const user_schema_1 = require("../user/user.schema");
const hire_enum_1 = require("./enum/hire.enum");
let ItemDesign = class ItemDesign {
};
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], ItemDesign.prototype, "image", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], ItemDesign.prototype, "coHomeUrl", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean }),
    __metadata("design:type", Boolean)
], ItemDesign.prototype, "isChoose", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], ItemDesign.prototype, "materials", void 0);
ItemDesign = __decorate([
    (0, mongoose_1.Schema)()
], ItemDesign);
let ItemFloorDesign = class ItemFloorDesign {
};
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], ItemFloorDesign.prototype, "floor", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: (Array) }),
    __metadata("design:type", Array)
], ItemFloorDesign.prototype, "designs", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: hire_enum_1.STATUS_DRAWING_FLOOR }),
    __metadata("design:type", Boolean)
], ItemFloorDesign.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], ItemFloorDesign.prototype, "phaseId", void 0);
ItemFloorDesign = __decorate([
    (0, mongoose_1.Schema)()
], ItemFloorDesign);
let ItemHouseDesign = class ItemHouseDesign {
};
__decorate([
    (0, mongoose_1.Prop)({ type: (Array) }),
    __metadata("design:type", Array)
], ItemHouseDesign.prototype, "designs", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Boolean }),
    __metadata("design:type", Boolean)
], ItemHouseDesign.prototype, "status", void 0);
ItemHouseDesign = __decorate([
    (0, mongoose_1.Schema)()
], ItemHouseDesign);
let Hire = class Hire {
};
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: user_schema_1.User.name,
        required: true,
    }),
    __metadata("design:type", String)
], Hire.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: user_schema_1.User.name,
        required: true,
    }),
    __metadata("design:type", String)
], Hire.prototype, "designerId", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: detail_drawing_schema_1.DetailDrawing.name,
        required: true,
    }),
    __metadata("design:type", String)
], Hire.prototype, "detailDrawingId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: (Array) }),
    __metadata("design:type", Array)
], Hire.prototype, "floorDesigns", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: (Array) }),
    __metadata("design:type", Array)
], Hire.prototype, "houseDesigns", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: hire_enum_1.STATUS_HIRE, required: true }),
    __metadata("design:type", String)
], Hire.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Array)
], Hire.prototype, "transactions", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Hire.prototype, "projectId", void 0);
Hire = __decorate([
    (0, schema_decorator_1.DSchema)()
], Hire);
exports.Hire = Hire;
exports.HireSchema = mongoose_1.SchemaFactory.createForClass(Hire);
//# sourceMappingURL=hire.schema.js.map