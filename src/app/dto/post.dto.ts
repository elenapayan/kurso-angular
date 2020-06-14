import { PostDetailDTO } from './post-detail.dto';

export interface PostDTO {
    _id: string;
    nickname: string;
    authorId: string;
    title: string;
    content: string;
    comments: PostDetailDTO[];
}
