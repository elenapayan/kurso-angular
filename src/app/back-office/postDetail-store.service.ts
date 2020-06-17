import { Injectable } from '@angular/core';
import { tap } from 'rxjs/internal/operators/tap';
import { PostDetail } from '../models/post-detail.model';
import { Post } from '../models/post.model';
import { Store } from '../store';
import { BackOfficeService } from './back-office.service';



@Injectable({ providedIn: 'root' })

export class PostDetailStoreService extends Store<Post> {
    constructor(private service: BackOfficeService) {
        super();
    }

    init(id): Promise<Post> {
        return this.service.getPostById(id).pipe(
            tap(post => this.store(post))
        ).toPromise();
    }

    addComment$(id: string, comment: PostDetail): Promise<PostDetail> {
        return this.service.addComment(id, comment).pipe(
            tap(newComment => {
                const post = this.get();
                const newComments = [...post.comments, newComment];
                const newPost = { ...post, comments: newComments };
                this.store(newPost);
            })).toPromise();
    }

    deleteComment$(id: string): Promise<PostDetail> {
        return this.service.deleteComment(id).pipe(
            tap(() => {
                const post = this.get();
                const newPosts = post.comments.filter(comment => comment._id !== id);
                const newPost = { ...post, comments: newPosts };
                this.store(newPost);
            })
        ).toPromise();
    }

    updateComment$(id: string, comment: PostDetail): Promise<PostDetail> {
        return this.service.updateComment(id, comment).pipe(
            tap(newComment => {
                const post = this.get();
                const c = Object.assign({}, newComment);
                const index = this.searchIndex(post.comments, id);
                const newComments = [...post.comments.slice(0, index), c, ...post.comments.slice(index + 1)];
                const newPost = { ...post, comments: newComments };
                this.store(newPost);
            })
        ).toPromise();
    }

    private searchIndex(comments: PostDetail[], commentId: string): number {
        return comments.findIndex(item => item._id === commentId);
    }
}

