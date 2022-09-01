import { Router } from "express";
import { Post } from "../Entities/post";
import { Comment } from '../Entities/comment'
import { Vote } from "../Entities/vote";
import { postDetails } from "../utilities";
import { Tag } from "../Entities/tag";
import { User } from "../Entities/user";
import { In } from "typeorm";

const router = Router();
//Get all posts
router.get('/', async (req, res) => {
    const posts = await Post.find({ relations: { comments: true, votes: true, tags: true } });
    const detailedPosts = posts.map(postDetails)
    res.json({ data: detailedPosts })
})
// Get a specific post by id
router.get('/:id', async (req, res) => {
    const id = +(req.params.id)
    const post = await Post.findOne({ where: { id }, relations: { comments: true, votes: true, tags: true } });
    const detailedPost = postDetails(post!);
    res.json({ data: detailedPost })
})
//Post a new post
router.post('/', async (req, res) => {
    try {
        const { title,
            body,
            userId,
            tagIds,
        } = req.body;
        const tags = await Tag.find({ where: { id: In(tagIds) } })
        const post = Post.create({
            title,
            body,
            userId,
            tags
        })
        await post.save();
        res.json({ data: `Post created successfully` })
    } catch (error) {
        res.status(500).json({ msg: error });
        console.log(error)
    }

})
//Delete a specific post by id
router.delete('/:id', async (req, res) => {
    try {
        const id = +(req.params.id)
        const post = await Post.delete({ id });
        console.log(post)
        res.json({ data: "Post deleted successfully" })
    } catch (error) {
        res.status(500).json({ msg: error });
    }
})

//Post a new comment
router.post('/:id/comments', async (req, res) => {
    try {
        const id = +(req.params.id)
        const { userId, body } = req.body
        const comment = Comment.create({
            userId,
            body,
            post: { id }
        })
        await comment.save();
        res.json({ data: "comment created successfully" })
    } catch (error) {
        res.status(500).json({ msg: error });
    }
})
//Get all comments for a specific post-------
router.get('/:id/comments', async (req, res) => {
    const id = +(req.params.id)
    const comments = await Comment.find({ where: { post: { id } } });
    res.json({ data: comments })
})


//Delete a comment
router.delete('/:postid/comments/:id', async (req, res) => {
    try {
        const postId = +(req.params.postid)
        const id = +(req.params.id)
        const comment = await Comment.delete({ id });
        console.log(comment)
        res.json({ data: "Comment deleted successfully" })
    } catch (error) {
        res.status(500).json({ msg: error });
    }
})
//Voting
router.post('/:id/votes', async (req, res) => {
    try {
        const postId = +req.params.id
        const userId = req.body.userId
        const vote = await Vote.findOne({
            where: {
                userId,
                post: { id: postId }
            }
        })
        console.log(vote)
        if (!vote) {
            const newVote = Vote.create({
                userId,
                value: req.body.value,
                post: { id: postId }
            })
            await newVote.save()
            res.json({ data: "Vote created successfully" })
        } else
            if (req.body.value === 1 || req.body.value === -1) {
                const updatedVote = Vote.update(vote.id, {
                    userId: req.body.userId,
                    value: req.body.value,
                    post: { id: postId }
                })
                res.status(500).json({ data: "Updating user vote..." })
            } else {
                res.status(500).json({ data: "Invalid vote value" })
            }
    } catch (error) {
        res.status(500).json({ msg: error });
    }
})


router.delete('/:postId/votes/', async (req, res) => {
    try {
        const newPostId = +(req.params.postId)
        const vote = await Vote.delete({ value: req.body.userId, post: { id: newPostId }, userId: req.body.userId });
        console.log(vote)
        res.json({ data: "Vote deleted successfully" })
    } catch (error) {
        res.status(500).json({ msg: error });
    }
})
export default router;