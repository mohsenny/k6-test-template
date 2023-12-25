"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authHeader = exports.defaultHeader = void 0;
exports.defaultHeader = {
    'content-type': 'application/json',
};
function authHeader(token) {
    return {
        'content-type': 'application/json',
        'authorization': `Bearer ${token}`
    };
}
exports.authHeader = authHeader;
