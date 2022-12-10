"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeApp = void 0;
const firebase_admin_1 = require("firebase-admin");
const fs = require("fs");
const initializeApp = async () => {
    const data = fs.readFileSync('serviceAccountKey.json', 'utf-8');
    const serviceAccount = JSON.parse(data);
    return firebase_admin_1.default.initializeApp({
        credential: firebase_admin_1.default.credential.cert(serviceAccount),
    });
};
exports.initializeApp = initializeApp;
//# sourceMappingURL=firebase.js.map