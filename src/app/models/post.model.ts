import { PostDetail } from './post-detail.model';

export interface Post {
    _id: string;
    nickname: string;
    title: string;
    content: string;
    comments: PostDetail[];
}
