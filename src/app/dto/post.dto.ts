import { PostDetailDTO } from './post-detail.dto';

export interface PostDTO {
    _id: string;
    nickname: string;
    author: string;
    title: string;
    content: string;
    comments: PostDetailDTO[];
}
