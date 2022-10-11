"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_1 = require("../Entities/post");
const comment_1 = require("../Entities/comment");
const vote_1 = require("../Entities/vote");
const utilities_1 = require("../utilities");
const tag_1 = require("../Entities/tag");
const typeorm_1 = require("typeorm");
const router = (0, express_1.Router)();
//Get all posts
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const posts = yield post_1.Post.find({ relations: { comments: true, votes: true, tags: true } });
    const detailedPosts = posts.map(utilities_1.postDetails);
    res.json({ data: detailedPosts });
}));
// Get a specific post by id
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +(req.params.id);
    const post = yield post_1.Post.findOne({ where: { id }, relations: { comments: true, votes: true, tags: true } });
    const detailedPost = (0, utilities_1.postDetails)(post);
    res.json({ data: detailedPost });
}));
//Post a new post
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, body, userId, tagIds, } = req.body;
        const tags = yield tag_1.Tag.find({ where: { id: (0, typeorm_1.In)(tagIds) } });
        const post = post_1.Post.create({
            title,
            body,
            userId,
            tags
        });
        yield post.save();
        res.json({ data: `Post created successfully` });
    }
    catch (error) {
        res.status(500).json({ msg: error });
        console.log(error);
    }
}));
//Delete a specific post by id
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +(req.params.id);
        const post = yield post_1.Post.delete({ id });
        console.log(post);
        res.json({ data: "Post deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ msg: error });
    }
}));
//Post a new comment
router.post('/:id/comments', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +(req.params.id);
        const { userId, body } = req.body;
        const comment = comment_1.Comment.create({
            userId,
            body,
            post: { id }
        });
        yield comment.save();
        res.json({ data: "comment created successfully" });
    }
    catch (error) {
        res.status(500).json({ msg: error });
    }
}));
//Get all comments for a specific post-------
router.get('/:id/comments', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +(req.params.id);
    const comments = yield comment_1.Comment.find({ where: { post: { id } } });
    res.json({ data: comments });
}));
//Delete a comment
router.delete('/:postid/comments/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = +(req.params.postid);
        const id = +(req.params.id);
        const comment = yield comment_1.Comment.delete({ id });
        console.log(comment);
        res.json({ data: "Comment deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ msg: error });
    }
}));
//Voting
router.post('/:id/votes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const postId = +req.params.id;
        const userId = req.body.userId;
        const vote = yield vote_1.Vote.findOne({
            where: {
                userId,
                post: { id: postId }
            }
        });
        console.log(vote);
        if (!vote) {
            const newVote = vote_1.Vote.create({
                userId,
                value: req.body.value,
                post: { id: postId }
            });
            yield newVote.save();
            res.json({ data: "Vote created successfully" });
        }
        else if (req.body.value === 1 || req.body.value === -1) {
            const updatedVote = vote_1.Vote.update(vote.id, {
                userId: req.body.userId,
                value: req.body.value,
                post: { id: postId }
            });
            res.status(500).json({ data: "Updating user vote..." });
        }
        else {
            res.status(500).json({ data: "Invalid vote value" });
        }
    }
    catch (error) {
        res.status(500).json({ msg: error });
    }
}));
router.delete('/:postId/votes/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newPostId = +(req.params.postId);
        const vote = yield vote_1.Vote.delete({ value: req.body.userId, post: { id: newPostId }, userId: req.body.userId });
        console.log(vote);
        res.json({ data: "Vote deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ msg: error });
    }
}));
exports.default = router;
