"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerMemoryOption = exports.multerDiskOption = void 0;
const multer_1 = require("multer");
const storageDisk = (0, multer_1.diskStorage)({
    destination: function (req, file, cb) {
        cb(null, './public');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + '.' + file.originalname.split('.').pop());
    },
});
const storageMemory = (0, multer_1.memoryStorage)();
const fileFilter = (request, file, callback) => {
    if (file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg') {
        callback(null, true);
    }
    else {
        callback(null, false);
    }
};
exports.multerDiskOption = {
    storage: storageDisk,
    fileFilter,
};
exports.multerMemoryOption = {
    storage: storageMemory,
    fileFilter,
};
//# sourceMappingURL=multer.option.js.map