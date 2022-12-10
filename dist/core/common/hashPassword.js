"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sha512 = void 0;
const crypto_1 = require("crypto");
const hash = (algorithm, text) => {
    return (0, crypto_1.createHash)(algorithm).update(text).digest('hex');
};
const sha512 = (text) => {
    return hash('sha512', text);
};
exports.sha512 = sha512;
//# sourceMappingURL=hashPassword.js.map