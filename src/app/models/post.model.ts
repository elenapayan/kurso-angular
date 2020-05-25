import { PostDetail } from './post-detail.model';

export interface Post {
    _id: string;
    author: string;
    nickname: string;
    authorId: string;
    title: string;
    content: string;
    comments: PostDetail[];
}
