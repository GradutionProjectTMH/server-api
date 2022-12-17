"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApisModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./auth/auth.module");
const comment_module_1 = require("./comment/comment.module");
const order_module_1 = require("./order/order.module");
const product_module_1 = require("./product/product.module");
const user_module_1 = require("./user/user.module");
const logger_middleware_1 = require("../core/middleware/logger.middleware");
const project_module_1 = require("./project/project.module");
const detail_drawing_module_1 = require("./detail-drawing/detail-drawing.module");
const upload_module_1 = require("./upload/upload.module");
const hire_module_1 = require("./hire/hire.module");
const transaction_module_1 = require("./transaction/transaction.module");
const coin_module_1 = require("./coin/coin.module");
const environment_module_1 = require("./environment/environment.module");
const text_razor_module_1 = require("./text-razor/text-razor.module");
let ApisModule = class ApisModule {
    configure(consumer) {
        consumer
            .apply(logger_middleware_1.LoggerMiddleware)
            .forRoutes({ path: '*', method: common_1.RequestMethod.ALL });
    }
};
ApisModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            project_module_1.ProjectModule,
            product_module_1.ProductModule,
            order_module_1.OrderModule,
            comment_module_1.CommentModule,
            detail_drawing_module_1.DetailModule,
            upload_module_1.UploadModule,
            hire_module_1.HireModule,
            transaction_module_1.TransactionModule,
            coin_module_1.CoinModule,
            environment_module_1.EnvironmentModule,
            text_razor_module_1.TextRazorModule,
        ],
        controllers: [],
        providers: [],
    })
], ApisModule);
exports.ApisModule = ApisModule;
//# sourceMappingURL=apis.module.js.map