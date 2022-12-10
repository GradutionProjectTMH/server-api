"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsObjectId = void 0;
const class_validator_1 = require("class-validator");
const mongodb = require("mongodb");
function IsObjectId() {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isObjectId',
            target: object.constructor,
            propertyName: propertyName,
            options: {
                message: '$property must be a  ObjectId',
            },
            validator: {
                validate(value) {
                    return mongodb.ObjectId.isValid(value);
                },
            },
        });
    };
}
exports.IsObjectId = IsObjectId;
//# sourceMappingURL=is-object-id.validation.js.map