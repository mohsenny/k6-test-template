"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPosts = void 0;
const index_js_1 = require("../config/index.js");
const http_1 = __importDefault(require("k6/http"));
const http_js_1 = require("../http.js");
// import { logger } from '../logger.js';
const getPosts = () => {
    const response = http_1.default.get(index_js_1.endpoints.list.jsonPlaceholderPosts.getPosts, {
        headers: http_js_1.defaultHeader,
    });
    if (response.status !== 200) {
        // errorLogger('Logging in', response);
    }
    let token = JSON.parse(response.body).token;
    return token;
};
exports.getPosts = getPosts;
