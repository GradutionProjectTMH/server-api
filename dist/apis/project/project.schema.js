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
exports.ProjectSchema = exports.Project = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const schema_decorator_1 = require("../../core/decorators/schema.decorator");
const user_schema_1 = require("../user/user.schema");
const project_enum_1 = require("./enum/project.enum");
let Design2D = class Design2D {
};
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], Design2D.prototype, "house_boundary", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], Design2D.prototype, "width", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], Design2D.prototype, "height", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Design2D.prototype, "boundaryImg", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Design2D.prototype, "crossSectionImg", void 0);
Design2D = __decorate([
    (0, mongoose_1.Schema)()
], Design2D);
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
    (0, mongoose_1.Schema)()
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
    (0, mongoose_1.Schema)()
], Room);
let CoHomeLink = class CoHomeLink {
};
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], CoHomeLink.prototype, "co_home_link", void 0);
CoHomeLink = __decorate([
    (0, mongoose_1.Schema)()
], CoHomeLink);
let StepOne = class StepOne {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: user_schema_1.User.name }),
    __metadata("design:type", String)
], StepOne.prototype, "designerId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: (Array) }),
    __metadata("design:type", Array)
], StepOne.prototype, "firstFloorDesigns", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], StepOne.prototype, "numDrafts", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], StepOne.prototype, "audittedTimes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], StepOne.prototype, "status", void 0);
StepOne = __decorate([
    (0, mongoose_1.Schema)()
], StepOne);
let StepTwo = class StepTwo {
};
StepTwo = __decorate([
    (0, mongoose_1.Schema)()
], StepTwo);
let Project = class Project {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: user_schema_1.User.name }),
    __metadata("design:type", String)
], Project.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Design2D }),
    __metadata("design:type", Design2D)
], Project.prototype, "design2D", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: (Array) }),
    __metadata("design:type", Array)
], Project.prototype, "expectedMaterial", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: (Array) }),
    __metadata("design:type", Array)
], Project.prototype, "rooms", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: project_enum_1.PROJECT_STATUS }),
    __metadata("design:type", Number)
], Project.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: StepOne }),
    __metadata("design:type", StepOne)
], Project.prototype, "stepOne", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: StepTwo }),
    __metadata("design:type", StepTwo)
], Project.prototype, "stepTwo", void 0);
Project = __decorate([
    (0, schema_decorator_1.DSchema)()
], Project);
exports.Project = Project;
exports.ProjectSchema = mongoose_1.SchemaFactory.createForClass(Project);
//# sourceMappingURL=project.schema.js.map