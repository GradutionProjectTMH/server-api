"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumTransform = void 0;
const class_transformer_1 = require("class-transformer");
const EnumTransform = (entity) => (0, class_transformer_1.Transform)((value) => {
    if (Object.values(entity).indexOf(value.value) > -1) {
        return value.value;
    }
    if (entity.hasOwnProperty(value.value)) {
        return entity[value.value];
    }
});
exports.EnumTransform = EnumTransform;
//# sourceMappingURL=enum-transform.decorator.js.map