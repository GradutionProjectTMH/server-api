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
exports.EnvironmentSchema = exports.Environment = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const schema_decorator_1 = require("../../core/decorators/schema.decorator");
let Environment = class Environment {
};
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Environment.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], Environment.prototype, "environment", void 0);
Environment = __decorate([
    (0, schema_decorator_1.DSchema)()
], Environment);
exports.Environment = Environment;
exports.EnvironmentSchema = mongoose_1.SchemaFactory.createForClass(Environment);
//# sourceMappingURL=environment.schema.js.map