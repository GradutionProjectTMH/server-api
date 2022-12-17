"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HireModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const hire_controller_1 = require("./hire.controller");
const hire_service_1 = require("./hire.service");
const hire_schema_1 = require("./hire.schema");
const user_service_1 = require("../user/user.service");
const user_schema_1 = require("../user/user.schema");
const upload_schema_1 = require("../upload/upload.schema");
const detail_drawing_service_1 = require("../detail-drawing/detail-drawing.service");
const detail_drawing_schema_1 = require("../detail-drawing/detail-drawing.schema");
const upload_service_1 = require("../upload/upload.service");
const product_schema_1 = require("../product/product.schema");
let HireModule = class HireModule {
};
HireModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: hire_schema_1.Hire.name, schema: hire_schema_1.HireSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: upload_schema_1.Upload.name, schema: upload_schema_1.UploadSchema },
                { name: detail_drawing_schema_1.DetailDrawing.name, schema: detail_drawing_schema_1.DetailDrawingSchema },
                { name: product_schema_1.Product.name, schema: product_schema_1.ProductSchema },
            ]),
        ],
        controllers: [hire_controller_1.HireController],
        providers: [hire_service_1.HireService, user_service_1.UserService, upload_service_1.UploadService, detail_drawing_service_1.DetailDrawingService],
    })
], HireModule);
exports.HireModule = HireModule;
//# sourceMappingURL=hire.module.js.map