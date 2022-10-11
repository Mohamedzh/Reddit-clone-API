"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postDetails = void 0;
const postDetails = (post) => {
    var _a, _b, _c;
    return Object.assign(Object.assign({}, post), { commentsTotal: (_a = post.comments) === null || _a === void 0 ? void 0 : _a.length, upVotesTotal: (_b = post.votes) === null || _b === void 0 ? void 0 : _b.filter((vote) => vote.value === 1).length, downVotesTotal: (_c = post.votes) === null || _c === void 0 ? void 0 : _c.filter((vote) => vote.value === -1).length });
};
exports.postDetails = postDetails;
