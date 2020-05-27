import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { PostDetailDTO } from '../dto/post-detail.dto';
import { PostDTO } from '../dto/post.dto';
import { UserDTO } from '../dto/user.dto';

@Injectable({
  providedIn: 'root'
})
export class BackOfficeProxyService {

  constructor(private httpClient: HttpClient) { }

  getAllPost(): Observable<PostDTO[]> {
    return this.httpClient.get<PostDTO[]>('http://localhost:3000/api/posts');
  }

  getPostById(id: string): Observable<PostDTO> {
    return this.httpClient.get<PostDTO>(`http://localhost:3000/api/posts/${id}`);
  }

  savePost(post: object): Observable<PostDTO> {
    return this.httpClient.post<PostDTO>('http://localhost:3000/api/posts', post);
  }

  updatePost(id, post): Observable<PostDTO> {
    return this.httpClient.put<PostDTO>(`http://localhost:3000/api/posts/${id}`, post);
  }

  deletePost(id): Observable<PostDTO> {
    return this.httpClient.delete<PostDTO>(`http://localhost:3000/api/posts/${id}`);
  }

  addComment(id, comment): Observable<PostDetailDTO> {
    return this.httpClient.post<PostDetailDTO>(`http://localhost:3000/api/posts/${id}/comment`, comment);
  }

  updateComment(id, comment): Observable<PostDetailDTO> {
    return this.httpClient.put<PostDetailDTO>(`http://localhost:3000/api/comments/${id}`, comment);
  }

  deleteComment(id): Observable<PostDetailDTO> {
    return this.httpClient.delete<PostDetailDTO>(`http://localhost:3000/api/comments/${id}`);
  }

  createUser(user): Observable<UserDTO> {
    return this.httpClient.post<UserDTO>('http://localhost:3000/api/user/', user);
  }
}
