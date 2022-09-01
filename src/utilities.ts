import { Post } from "./Entities/post";

export const postDetails = (post: Post) => {
    return {
        ...post,
        commentsTotal: post.comments?.length,
        upVotesTotal: post.votes?.filter((vote) => vote.value === 1).length,
        downVotesTotal: post.votes?.filter((vote) => vote.value === -1).length
    }
}