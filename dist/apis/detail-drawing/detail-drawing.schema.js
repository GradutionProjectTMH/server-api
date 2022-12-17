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
exports.DetailDrawingSchema = exports.DetailDrawing = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schema_decorator_1 = require("../../core/decorators/schema.decorator");
const user_schema_1 = require("../user/user.schema");
const detail_drawing_enum_1 = require("./enum/detail-drawing.enum");
let ExpectedMaterial = class ExpectedMaterial {
};
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], ExpectedMaterial.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], ExpectedMaterial.prototype, "amount", void 0);
ExpectedMaterial = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], ExpectedMaterial);
let Room = class Room {
};
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Room.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], Room.prototype, "amount", void 0);
Room = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], Room);
let BountyReward = class BountyReward {
};
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], BountyReward.prototype, "coinId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], BountyReward.prototype, "amount", void 0);
BountyReward = __decorate([
    (0, mongoose_1.Schema)({ _id: false })
], BountyReward);
let DetailDrawing = class DetailDrawing {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: user_schema_1.User.name }),
    __metadata("design:type", String)
], DetailDrawing.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], DetailDrawing.prototype, "houseBoundary", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], DetailDrawing.prototype, "width", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], DetailDrawing.prototype, "height", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], DetailDrawing.prototype, "numberOfFloors", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], DetailDrawing.prototype, "heightOfEachFloors", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], DetailDrawing.prototype, "themeColor", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], DetailDrawing.prototype, "boundaryImg", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], DetailDrawing.prototype, "crossSectionImg", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: (Array) }),
    __metadata("design:type", Array)
], DetailDrawing.prototype, "expectedMaterial", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: (Array) }),
    __metadata("design:type", Array)
], DetailDrawing.prototype, "rooms", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: (Array) }),
    __metadata("design:type", Array)
], DetailDrawing.prototype, "bountyRewards", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Object }),
    __metadata("design:type", Object)
], DetailDrawing.prototype, "additionalInformation", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: detail_drawing_enum_1.DETAIL_DRAWING_STATUS }),
    __metadata("design:type", String)
], DetailDrawing.prototype, "status", void 0);
DetailDrawing = __decorate([
    (0, schema_decorator_1.DSchema)()
], DetailDrawing);
exports.DetailDrawing = DetailDrawing;
exports.DetailDrawingSchema = mongoose_1.SchemaFactory.createForClass(DetailDrawing);
//# sourceMappingURL=detail-drawing.schema.js.map