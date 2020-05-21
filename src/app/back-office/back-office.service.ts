import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { PostDetailDTO } from '../dto/post-detail.dto';
import { PostDTO } from '../dto/post.dto';

@Injectable({
  providedIn: 'root'
})
export class BackOfficeService {

  constructor(private httpClient: HttpClient) { }

  getAllPost(): Observable<PostDTO[]> {
    return this.httpClient.get<PostDTO[]>('http://localhost:3000/api/posts');
  }

  getPostById(id): Observable<PostDTO> {
    return this.httpClient.get<PostDTO>(`http://localhost:3000/api/posts/${id}`);
  }

  savePost(post): Observable<PostDTO> {
    return this.httpClient.post<PostDTO>('http://localhost:3000/api/posts', post);
  }

  updatePost(id, post): Observable<any> {
    return this.httpClient.put(`http://localhost:3000/api/posts/${id}`, post);
  }

  deletePost(id): Observable<PostDTO> {
    return this.httpClient.delete<PostDTO>(`http://localhost:3000/api/posts/${id}`);
  }

  deleteComment(id): Observable<PostDetailDTO> {
    return this.httpClient.delete<PostDetailDTO>(`http://localhost:3000/api/comments/${id}`);
  }

  addComment(id, comment): Observable<PostDetailDTO>{
    return this.httpClient.post<PostDetailDTO>(`http://localhost:3000/api/posts/${id}/comment`, comment);
  }

  updateComment(id, comment): Observable<PostDetailDTO>{
    return this.httpClient.put<PostDetailDTO>(`http://localhost:3000/api/comments/${id}`, comment);
  }
}
