import { PostDetail } from './post-detail.model';

export interface Post {
    id: string;
    nickname: string;
    authorId: string;
    title: string;
    content: string;
    comments: PostDetail[];
}
