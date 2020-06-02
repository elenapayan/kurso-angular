import { PostDetail } from './post-detail.model';

export interface Post {
    id: string;
    nickname: string;
    author: string;
    title: string;
    content: string;
    comments: PostDetail[];
}
