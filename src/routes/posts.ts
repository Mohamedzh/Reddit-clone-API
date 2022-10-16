import { Router } from "express";
import { Post } from "../Entities/post";
import { Comment } from '../Entities/comment'
import { Vote } from "../Entities/vote";
import { postDetails } from "../utilities";
import { Tag } from "../Entities/tag";
import { User } from "../Entities/user";
import { In } from "typeorm";

const router = Router();

router.get('/', async (req, res) => {
    /*
    #swagger.tags = ['Posts']
    #swagger.summary = 'Get all posts'
    */
    try {
        const posts = await Post.find({ relations: { comments: true, votes: true, tags: true } });
        const detailedPosts = posts.map(postDetails)
        res.status(200).json({ data: posts })
    } catch (error) {
        res.status(500).json({ data: error })
    }
})
// Get a specific post by id
router.get('/:id', async (req, res) => {
    /*
    #swagger.tags = ['Posts']
    #swagger.summary = 'Get a specific post by id'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'Post id',
    }
    */
    try {
        const id = +(req.params.id)
        const post = await Post.findOne({ where: { id }, relations: { comments: true, votes: true, tags: true } });
        const detailedPost = postDetails(post!);
        res.status(200).json({ data: detailedPost })
    } catch (error) {
        res.status(500).json({ data: error })
    }
})

router.post('/', async (req, res) => {
    /*
   #swagger.tags = ['Posts']
   #swagger.summary = 'Post a new post'
   #swagger.parameters['title',
           'body',
           'userId',
           'tagIds'] = {
       in: 'body',
       description: 'The post data',
   }
   */
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
        res.status(200).json({ data: `Post created successfully` })
    } catch (error) {
        res.status(500).json({ msg: error });
    }

})

router.delete('/:id', async (req, res) => {
    /*
    #swagger.tags = ['Posts']
    #swagger.summary = 'Delete a specific post by id'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'Post id',
    }
    */
    try {
        const id = +(req.params.id)
        const post = await Post.delete({ id });
        res.status(200).json({ data: "Post deleted successfully" })
    } catch (error) {
        res.status(500).json({ msg: error });
    }
})

router.post('/:id/comments', async (req, res) => {
    /*
   #swagger.tags = ['Comments']
   #swagger.summary = 'Post a new comment'
   #swagger.parameters['body', 'userId'] = {
       in: 'body',
       description: 'The comment data',
   }
   #swagger.parameters['id'] = {
       in: 'path',
       description: 'The id of the post to comment on',
   }
   */
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

router.get('/:id/comments', async (req, res) => {
    /*
    #swagger.tags = ['Comments']
    #swagger.summary = 'Get all comments for a specific post by post id'
    #swagger.parameters['id'] = {
        in: 'path',
        description: 'Post id',
    }
    */
    try {
        const id = +(req.params.id)
        const comments = await Comment.find({ where: { post: { id } } });
        res.status(200).json({ data: comments })
    } catch (error) {
        res.status(500).json({ msg: error });
    }
})

router.delete('/:postid/comments/:id', async (req, res) => {
    /*
   #swagger.tags = ['Comments']
   #swagger.summary = 'Delete a comment'
   #swagger.parameters['id'] = {
       in: 'path',
       description: 'The id of the comment to delete',
   }
   #swagger.parameters['postid'] = {
       in: 'path',
       description: 'The id of the post containing the comment',
   }
   */
    try {
        const postId = +(req.params.postid)
        const id = +(req.params.id)
        const comment = await Comment.delete({ id });
        res.json({ data: "Comment deleted successfully" })
    } catch (error) {
        res.status(500).json({ msg: error });
    }
})



router.post('/:id/votes', async (req, res) => {
    /*
  #swagger.tags = ['Votes']
  #swagger.summary = 'Post a vote'
  #swagger.parameters['value'] = {
      in: 'body',
      description: 'The vote value, 1 for upvote & -1 for downvote',
      required: true,
      type: 'number',
      format:'int64',
      schema: '1'
  }
  #swagger.parameters['userId'] = {
      in: 'body',
      description: 'The id of the voting user',
      required: true,
      type: 'string',
      schema: '1'
  }
  #swagger.parameters['id'] = {
       in: 'path',
       description: 'The id of the post to vote on',
   }
  */
    try {
        const postId = +req.params.id
        const userId = req.body.userId
        const { value } = req.body
        const vote = await Vote.findOne({
            where: {
                userId,
                post: { id: postId }
            }
        })
        if (!vote) {
            const newVote = Vote.create({
                userId,
                value,
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
    /*
  #swagger.tags = ['Votes']
  #swagger.summary = 'Post a vote'
  #swagger.parameters['value'] = {
      in: 'body',
      description: 'The vote value, 1 for upvote & -1 for downvote',
      required: true,
      type: 'number',
      format:'int64',
      schema: '1'
  }
  #swagger.parameters['userId'] = {
      in: 'body',
      description: 'The id of the voting user',
      required: true,
      type: 'string',
      schema: '1'
  }
  #swagger.parameters['postId'] = {
       in: 'path',
       description: 'The id of the post containing the vote',
   }
  */
    try {
        const { value, userId } = req.body
        const newPostId = +(req.params.postId)
        const vote = await Vote.delete({ value, post: { id: newPostId }, userId });
        res.status(200).json({ data: "Vote deleted successfully" })
    } catch (error) {
        res.status(500).json({ msg: error });
    }
})
export default router;