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
        return this.service.getAllPost().pipe(tap(this.store)
        ).toPromise();
    }

    createPost$(post: Post): Promise<Post> {
        return this.service.savePost(post).pipe(
            tap(postResult => {
                this.store([...this.get(), postResult]);
                console.log('postResult', postResult);
            })).toPromise();
    }

    updatePost$(postId: string, post: Post): Promise<Post> {
        console.log('update store1', postId, post);
        return this.service.updatePost(postId, post).pipe(
            tap(() => {
                console.log(post);
                const posts = this.get();
                // const p = Object.assign({}, post);
                const foo = {_id: postId, ...post};
                // const p = Object.assign({}, post);
                const p = Object.assign({}, foo);
                const index = this.searchIndex(posts, postId);
                const newPosts = [...posts.slice(0, index), p, ...posts.slice(index + 1)];
                this.store(newPosts);
                console.log('update store', newPosts);
            })
        ).toPromise();
    }

    deletePost$(postId: string): Promise<Post> {
        return this.service.deletePost(postId).pipe(
            tap(() => {
                const posts = this.get();
                const newPosts = posts.filter(post => post._id !== postId);
                this.store(newPosts);
                console.log('delete', newPosts);
            })).toPromise();
    }

    private searchIndex(posts: Post[], postId: string): number {
        return posts.findIndex(item => item._id === postId);
    }
}
