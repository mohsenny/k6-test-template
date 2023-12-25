"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = void 0;
const configure_js_1 = require("./configure.js");
exports.list = {
    postmanEcho: {
        getPostmanEcho: `${configure_js_1.options.host}/get`,
        postPostmanEcho: `${configure_js_1.options.host}/post`,
    },
    jsonPlaceholderPosts: {
        getPosts: `${configure_js_1.options.host}/posts`,
        createPosts: `${configure_js_1.options.host}/posts`,
    },
};
