"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFile = exports.removeKeyUndefined = exports.pagination = void 0;
const fs_1 = require("fs");
const pagination = (total, limit) => {
    return Math.ceil(total / limit);
};
exports.pagination = pagination;
const removeKeyUndefined = (data) => {
    Object.keys(data).forEach((key) => {
        if (data[key] === undefined) {
            delete data[key];
        }
    });
    return data;
};
exports.removeKeyUndefined = removeKeyUndefined;
const removeFile = (filename) => {
    try {
        const fileSplit = filename.split('/');
        (0, fs_1.unlinkSync)(`./public/${fileSplit[fileSplit.length - 1]}`);
        console.log(`successfully deleted /public/${filename}`);
    }
    catch (err) {
        console.log(err.message);
    }
};
exports.removeFile = removeFile;
//# sourceMappingURL=utils.js.map