import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PostDTO } from '../dto/post.dto';
import { BackOfficeProxyService } from './back-office-proxy.service';

describe('BackOfficeProxyService', () => {
  let service: BackOfficeProxyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(BackOfficeProxyService);
    httpMock = TestBed.inject(HttpTestingController); // Mockeamos la respuesta del servidor
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should verify get all posts request', () => {
    service.getAllPost().subscribe(
      (postDTO: PostDTO[]) => expect(postDTO).toBe(FAKE_POSTS)
    );
    const request = httpMock.expectOne('http://localhost:3000/api/posts');
    expect(request.request.method).toEqual('GET');
    request.flush(FAKE_POSTS);
  });

  it('should verify get by id request', () => {
    service.getPostById(FAKE_POSTS[0]._id).subscribe(
      (postDTO: PostDTO) => expect(postDTO).toBe(FAKE_POSTS[0])
    );
    const request = httpMock.expectOne(`http://localhost:3000/api/posts/${FAKE_POSTS[0]._id}`);
    expect(request.request.method).toEqual('GET');
    request.flush(FAKE_POSTS[0]);
  });

  it('should verify delete by id request', () => {
    service.deletePost(FAKE_POSTS[0]._id).subscribe(
      (postDTO: PostDTO) => expect(postDTO).toBe(FAKE_POSTS[0])
    );
    const request = httpMock.expectOne(`http://localhost:3000/api/posts/${FAKE_POSTS[0]._id}`);
    expect(request.request.method).toEqual('DELETE');
    request.flush(FAKE_POSTS[0]);
  });

  it('should verify save post request', () => {
    service.savePost(FAKE_POSTS[0]).subscribe(
      (postDTO: PostDTO) => expect(postDTO).toBe(FAKE_POSTS[0])
    );
    const request = httpMock.expectOne('http://localhost:3000/api/posts');
    expect(request.request.method).toEqual('POST');
    request.flush(FAKE_POSTS[0]);
  });

  it('should verify update post request', () => {
    service.updatePost(FAKE_POSTS[0]._id, FAKE_POSTS[0]).subscribe(
      (postDTO: PostDTO) => expect(postDTO).toBe(FAKE_POSTS[0])
    );
    const request = httpMock.expectOne(`http://localhost:3000/api/posts/${FAKE_POSTS[0]._id}`);
    expect(request.request.method).toEqual('PUT');
    request.flush(FAKE_POSTS[0]);
  });


});

export const FAKE_POSTS = [{
  _id: '5ecd2b3c671ce31402967797',
  nickname: 'Kovo',
  authorId: '5ec7c44eaacd04ea6861e164',
  title: 'Experiencia',
  content: 'La peor experiencia es la mejor maestra',
  comments: []
}];
