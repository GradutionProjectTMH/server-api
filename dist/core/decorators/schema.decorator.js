"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DSchema = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const DSchema = (options) => {
    return (0, mongoose_1.Schema)(Object.assign(Object.assign({}, options), { timestamps: true, versionKey: false }));
};
exports.DSchema = DSchema;
//# sourceMappingURL=schema.decorator.js.map