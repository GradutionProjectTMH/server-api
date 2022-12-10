"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseError = exports.responseSuccess = void 0;
const responseSuccess = (data, message = 'Success') => {
    return {
        success: true,
        message,
        data,
    };
};
exports.responseSuccess = responseSuccess;
const responseError = (message) => {
    return {
        success: false,
        message,
    };
};
exports.responseError = responseError;
//# sourceMappingURL=base.controller.js.map