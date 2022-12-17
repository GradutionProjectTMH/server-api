"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATUS_DRAWING_FLOOR = exports.STATUS_HIRE = void 0;
var STATUS_HIRE;
(function (STATUS_HIRE) {
    STATUS_HIRE["PENDING"] = "pending";
    STATUS_HIRE["RUNNING"] = "running";
    STATUS_HIRE["FINISH"] = "finish";
})(STATUS_HIRE = exports.STATUS_HIRE || (exports.STATUS_HIRE = {}));
var STATUS_DRAWING_FLOOR;
(function (STATUS_DRAWING_FLOOR) {
    STATUS_DRAWING_FLOOR["PENDING"] = "pending";
    STATUS_DRAWING_FLOOR["STARTED"] = "started";
    STATUS_DRAWING_FLOOR["RUNNING"] = "running";
    STATUS_DRAWING_FLOOR["SUBLIMED"] = "submitted";
    STATUS_DRAWING_FLOOR["FINISHED"] = "finished";
    STATUS_DRAWING_FLOOR["CANCELED"] = "canceled";
})(STATUS_DRAWING_FLOOR = exports.STATUS_DRAWING_FLOOR || (exports.STATUS_DRAWING_FLOOR = {}));
//# sourceMappingURL=hire.enum.js.map