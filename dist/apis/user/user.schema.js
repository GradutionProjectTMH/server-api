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
exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const enum_1 = require("../../core/constants/enum");
const schema_decorator_1 = require("../../core/decorators/schema.decorator");
const address_schema_1 = require("../../base/schemas/address.schema");
const base_schem_1 = require("../../base/schemas/base.schem");
const user_enum_1 = require("./enum/user.enum");
let ToolDesign = class ToolDesign {
};
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ToolDesign.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], ToolDesign.prototype, "logo", void 0);
ToolDesign = __decorate([
    (0, mongoose_1.Schema)()
], ToolDesign);
let Project = class Project {
};
__decorate([
    (0, mongoose_1.Prop)({ type: ToolDesign }),
    __metadata("design:type", ToolDesign)
], Project.prototype, "tool", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Project.prototype, "url", void 0);
Project = __decorate([
    (0, mongoose_1.Schema)()
], Project);
let Profile = class Profile {
};
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: String }),
    __metadata("design:type", String)
], Profile.prototype, "experience", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: (Array) }),
    __metadata("design:type", Array)
], Profile.prototype, "projects", void 0);
Profile = __decorate([
    (0, mongoose_1.Schema)()
], Profile);
let User = class User extends base_schem_1.BaseSchema {
};
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true }),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false }),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: true, enum: user_enum_1.SIGNUP_TYPE }),
    __metadata("design:type", String)
], User.prototype, "signupType", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false }),
    __metadata("design:type", String)
], User.prototype, "idToken", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: false }),
    __metadata("design:type", String)
], User.prototype, "avatar", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: enum_1.ROLE, required: true }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: enum_1.USER_STATUS, required: true }),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: address_schema_1.Address }),
    __metadata("design:type", address_schema_1.Address)
], User.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Profile }),
    __metadata("design:type", Profile)
], User.prototype, "profile", void 0);
User = __decorate([
    (0, schema_decorator_1.DSchema)()
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=user.schema.js.map