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

  getPostById(id): Observable<PostDTO>  {
    return this.httpClient.get<PostDTO>(`http://localhost:3000/api/posts/${id}`);
  }
}