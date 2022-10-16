import { Router } from "express";
import { Post } from "../Entities/post";
import { Tag } from "../Entities/tag";
const router = Router();

router.get('/', async (req, res) => {
    /*
    #swagger.tags = ['Tags']
    #swagger.summary = 'Get all tags'
    */
    try {
        const tags = await Tag.find();
        res.status(200).json({ data: tags })
    } catch (error) {
        res.status(500).json({ data: error })
    }

})

router.get('/:id', async (req, res) => {
    /*
    #swagger.tags = ['Tags']
    #swagger.summary = 'Get a specific tag by id'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'Tag id',
    }
    */
    try {
        const id = +(req.params.id)
        const tag = await Tag.findOneBy({ id });
        res.status(200).json({ data: tag })
    } catch (error) {
        res.status(500).json({ data: error })
    }
})

router.post('/', async (req, res) => {
    /*
    #swagger.tags = ['Tags']
    #swagger.summary = 'Post a new tag'
    #swagger.parameters['title'] = {
        in: 'body',
        description: 'The name of the tag',
    }
    */
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
    /*
    #swagger.tags = ['Tags']
    #swagger.summary = 'Link a tag to a post'
    #swagger.parameters['tagID', 'postId'] = {
        in: 'path',
        description: 'The ids of both the post and the tag to be linked',
    }
    */
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
