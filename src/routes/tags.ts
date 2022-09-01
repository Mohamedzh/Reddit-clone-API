import { Router } from "express";
import { Post } from "../Entities/post";
import { Tag } from "../Entities/tag";
const router = Router();
//Get all tags
router.get('/', async (req, res) => {
    const tags = await Tag.find();
    res.json({ data: tags })
})
// Get a specific tag by id
router.get('/:id', async (req, res) => {
    const id = +(req.params.id)
    const tag = await Tag.findOneBy({ id });
    res.json({ data: tag })
})
//Post a new tag
router.post('/', async (req, res) => {
    try {
        const { title } = req.body;
        const tag = Tag.create({
            title,
        })
        await tag.save();
        res.json({ data: `Tag created successfully` })
    } catch (error) {
        res.status(500).json({ msg: error });
        console.log(error)
    }
})
export default router
//Link a tag to a post
router.post('/:tagId/:postId/link', async (req, res) => {
    try {
        const tagId = +req.params.tagId
        const postId = +req.params.postId
        const tag = await Tag.findOne({ where: { id: tagId } })
        const post = await Post.findOne({ where: { id: postId }, relations: { tags: true } })
        if (post) {
            console.log(post)
            post.tags.push(tag!)
            await post.save()
        }
        res.json({ post })
    } catch (error) {
        res.status(500).json({ msg: error });
    }
})
