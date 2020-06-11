import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { PostDetailDTO } from '../dto/post-detail.dto';
import { PostDTO } from '../dto/post.dto';
import { UserDTO } from '../dto/user.dto';
import { PostDetail } from '../models/post-detail.model';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';
import { BackOfficeProxyService } from './back-office-proxy.service';

@Injectable({
  providedIn: 'root'
})
export class BackOfficeService {

  constructor(private proxy: BackOfficeProxyService) { }

  getAllPost(): Observable<Post[]> {
    return this.proxy.getAllPost().pipe(
      map((postsDTO: PostDTO[]) => {
        let posts: Post[] = [];
        postsDTO.forEach((postDTO: PostDTO) => {
          posts = [...posts, this.adaptPostDTOToModel(postDTO)];
        });
        return posts;
      })
    );
  }

  getPostById(id: string): Observable<Post> {
    return this.proxy.getPostById(id).pipe(
      map((postDTO: PostDTO) => this.adaptPostDTOToModel(postDTO))
    );
  }

  savePost(post: Post): Observable<Post> {
    return this.proxy.savePost(this.adaptPostModelToDTO(post)).pipe(
      map((postResult: PostDTO) => this.adaptPostDTOToModel(postResult))
    );
  }

  updatePost(id: string, post: Post): Observable<Post> {
    return this.proxy.updatePost(id, this.adaptPostModelToDTO(post)).pipe(
      map((postResult: PostDTO) => this.adaptPostDTOToModel(postResult))
    );
  }

  deletePost(id: string): Observable<Post> {
    return this.proxy.deletePost(id).pipe(
      map(postDTO => this.adaptPostDTOToModel(postDTO))
    );
  }

  addComment(id: string, comment: PostDetail): Observable<PostDetail> {
    return this.proxy.addComment(id, this.adaptPostDetailModelToDTO(comment)).pipe(
      map((postDetailResult: PostDetailDTO) => this.adaptPostDetailDTOToModel(postDetailResult))
    );
  }

  updateComment(id: string, comment: PostDetail): Observable<PostDetail> {
    return this.proxy.updateComment(id, this.adaptPostDetailModelToDTO(comment)).pipe(
      map((postDetailResult: PostDetailDTO) => this.adaptPostDetailDTOToModel(postDetailResult))
    );
  }

  deleteComment(id: string): Observable<PostDetail> {
    return this.proxy.deleteComment(id).pipe(
      map(postDetailDTO => this.adaptPostDetailDTOToModel(postDetailDTO))
    );
  }

  createUser(user): Observable<UserDTO> {
    return this.proxy.createUser(this.adaptUserModelToDTO(user));
  }

  private adaptPostDTOToModel(postDTO: PostDTO): Post {
    return {
      id: postDTO._id,
      nickname: postDTO.nickname,
      author: postDTO.author,
      title: postDTO.title,
      content: postDTO.content,
      comments: postDTO.comments
    };
  }

  private adaptPostModelToDTO(post: Post): PostDTO {
    return {
      _id: post.id,
      nickname: post.nickname,
      author: post.author,
      title: post.title,
      content: post.content,
      comments: post.comments
    };
  }

  private adaptPostDetailDTOToModel(postDetailDTO: PostDetailDTO): PostDetail {
    return {
      _id: postDetailDTO._id,
      nickname: postDetailDTO.nickname,
      comment: postDetailDTO.comment,
      date: postDetailDTO.date
    };
  }

  private adaptPostDetailModelToDTO(postDetail: PostDetail): PostDetailDTO {
    return {
      _id: postDetail._id,
      nickname: postDetail.nickname,
      comment: postDetail.comment,
      date: postDetail.date
    };
  }

  private adaptUserModelToDTO(user: User): UserDTO {
    return {
      username: user.username,
      password: user.password,
      role: user.role
    };
  }

}
