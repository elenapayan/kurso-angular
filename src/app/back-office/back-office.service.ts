import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
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
}
