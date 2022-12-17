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
exports.UploadSchema = exports.Upload = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const base_schem_1 = require("../../base/schemas/base.schem");
const schema_decorator_1 = require("../../core/decorators/schema.decorator");
const user_schema_1 = require("../user/user.schema");
const file_status_enum_1 = require("./enums/file-status.enum");
let Upload = class Upload extends base_schem_1.BaseSchema {
};
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: user_schema_1.User.name }),
    __metadata("design:type", String)
], Upload.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Upload.prototype, "location", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Upload.prototype, "etag", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Upload.prototype, "bucket", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Upload.prototype, "key", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, enum: file_status_enum_1.FILE_STATUS }),
    __metadata("design:type", String)
], Upload.prototype, "status", void 0);
Upload = __decorate([
    (0, schema_decorator_1.DSchema)()
], Upload);
exports.Upload = Upload;
exports.UploadSchema = mongoose_1.SchemaFactory.createForClass(Upload);
//# sourceMappingURL=upload.schema.js.map