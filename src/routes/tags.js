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
const tag_1 = require("../Entities/tag");
const router = (0, express_1.Router)();
//Get all tags
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tags = yield tag_1.Tag.find();
    res.json({ data: tags });
}));
// Get a specific tag by id
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +(req.params.id);
    const tag = yield tag_1.Tag.findOneBy({ id });
    res.json({ data: tag });
}));
//Post a new tag
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title } = req.body;
        const tag = tag_1.Tag.create({
            title,
        });
        yield tag.save();
        res.json({ data: `Tag created successfully` });
    }
    catch (error) {
        res.status(500).json({ msg: error });
        console.log(error);
    }
}));
exports.default = router;
//Link a tag to a post
router.post('/:tagId/:postId/link', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tagId = +req.params.tagId;
        const postId = +req.params.postId;
        const tag = yield tag_1.Tag.findOne({ where: { id: tagId } });
        const post = yield post_1.Post.findOne({ where: { id: postId }, relations: { tags: true } });
        if (post) {
            console.log(post);
            post.tags.push(tag);
            yield post.save();
        }
        res.json({ post });
    }
    catch (error) {
        res.status(500).json({ msg: error });
    }
}));
