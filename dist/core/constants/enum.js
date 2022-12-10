"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRODUCT_SORT = exports.COMMENT_SORT = exports.ORDER_STATUS = exports.PRODUCT_STATUS = exports.USER_STATUS = exports.ROLE = exports.HTTP_METHOD = exports.PAGE = exports.LIMIT = void 0;
exports.LIMIT = 10;
exports.PAGE = 1;
var HTTP_METHOD;
(function (HTTP_METHOD) {
    HTTP_METHOD["GET"] = "GET";
    HTTP_METHOD["POST"] = "POST";
    HTTP_METHOD["PUT"] = "PUT";
    HTTP_METHOD["DELETE"] = "DELETE";
})(HTTP_METHOD = exports.HTTP_METHOD || (exports.HTTP_METHOD = {}));
var ROLE;
(function (ROLE) {
    ROLE["ADMIN"] = "admin";
    ROLE["USER"] = "user";
    ROLE["DESIGNER"] = "designer";
    ROLE["SELLER"] = "seller";
})(ROLE = exports.ROLE || (exports.ROLE = {}));
var USER_STATUS;
(function (USER_STATUS) {
    USER_STATUS["ACTIVE"] = "active";
    USER_STATUS["BLOCK"] = "block";
})(USER_STATUS = exports.USER_STATUS || (exports.USER_STATUS = {}));
var PRODUCT_STATUS;
(function (PRODUCT_STATUS) {
    PRODUCT_STATUS["PENDING"] = "pending";
    PRODUCT_STATUS["APPROVE"] = "approve";
    PRODUCT_STATUS["REJECTED"] = "rejected";
})(PRODUCT_STATUS = exports.PRODUCT_STATUS || (exports.PRODUCT_STATUS = {}));
var ORDER_STATUS;
(function (ORDER_STATUS) {
    ORDER_STATUS["PENDING"] = "pending";
    ORDER_STATUS["APPROVE"] = "approve";
    ORDER_STATUS["REJECTED"] = "rejected";
})(ORDER_STATUS = exports.ORDER_STATUS || (exports.ORDER_STATUS = {}));
var COMMENT_SORT;
(function (COMMENT_SORT) {
    COMMENT_SORT["NEWTS"] = "newts";
    COMMENT_SORT["DESCENDING_STAR"] = "descending_star";
    COMMENT_SORT["ASCENDING_STAR"] = "ascending_star";
})(COMMENT_SORT = exports.COMMENT_SORT || (exports.COMMENT_SORT = {}));
var PRODUCT_SORT;
(function (PRODUCT_SORT) {
    PRODUCT_SORT["NEWTS"] = "newts";
    PRODUCT_SORT["HIGHT_TO_LOW"] = "hight_to_low";
    PRODUCT_SORT["LOW_TO_HIGHT"] = "low_to_hight";
    PRODUCT_SORT["DESCENDING_STAR"] = "descending_star";
    PRODUCT_SORT["ASCENDING_STAR"] = "ascending_star";
    PRODUCT_SORT["BUY_A_LOT"] = "buy_a_lot";
})(PRODUCT_SORT = exports.PRODUCT_SORT || (exports.PRODUCT_SORT = {}));
//# sourceMappingURL=enum.js.map