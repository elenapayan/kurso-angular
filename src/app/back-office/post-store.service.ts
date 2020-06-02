import { Injectable } from '@angular/core';
import { tap } from 'rxjs/internal/operators/tap';
import { Post } from '../models/post.model';
import { Store } from '../store';
import { BackOfficeService } from './back-office.service';


@Injectable({ providedIn: 'root' })

export class PostsStoreService extends Store<Post[]> {
    constructor(private service: BackOfficeService) {
        super();
    }

    init(): Promise<Post[]> {
        if (this.get()) { return; }
        return this.service.getAllPost().pipe(tap(posts => this.store(posts))
        ).toPromise();
    }

    createPost$(post: Post): Promise<Post> {
        return this.service.savePost(post).pipe(
            tap(postResult => {
                this.store([...this.get(), postResult]);
            })).toPromise();
    }

    updatePost$(postId: string, post: Post): Promise<Post> {
        return this.service.updatePost(postId, post).pipe(
            tap(newPost => {
                const posts = this.get();
                const p = Object.assign({}, newPost);
                const index = this.searchIndex(posts, postId);
                const newPosts = [...posts.slice(0, index), p, ...posts.slice(index + 1)];
                this.store(newPosts);
            })
        ).toPromise();
    }

    deletePost$(postId: string): Promise<Post> {
        return this.service.deletePost(postId).pipe(
            tap(() => {
                const posts = this.get();
                const newPosts = posts.filter(post => post.id !== postId);
                this.store(newPosts);
            })).toPromise();
    }

    private searchIndex(posts: Post[], postId: string): number {
        return posts.findIndex(item => item.id === postId);
    }
}
