import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PostDetailDTO } from '../dto/post-detail.dto';
import { PostDTO } from '../dto/post.dto';
import { UserDTO } from '../dto/user.dto';
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

  it('should verify delete post by id request', () => {
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

  it('should verify add comment request', () => {
    service.addComment(FAKE_POSTS[0]._id, FAKE_COMMENT).subscribe(
      (postDetailDTO: PostDetailDTO) => expect(postDetailDTO).toBe(FAKE_COMMENT)
    );
    const request = httpMock.expectOne(`http://localhost:3000/api/posts/${FAKE_POSTS[0]._id}/comment`);
    expect(request.request.method).toEqual('POST');
    request.flush(FAKE_COMMENT);
  });

  it('should verify update comment request', () => {
    service.updateComment(FAKE_COMMENT._id, FAKE_COMMENT).subscribe(
      (postDetailDTO: PostDetailDTO) => expect(postDetailDTO).toBe(FAKE_COMMENT)
    );
    const request = httpMock.expectOne(`http://localhost:3000/api/comments/${FAKE_COMMENT._id}`);
    expect(request.request.method).toEqual('PUT');
    request.flush(FAKE_COMMENT);
  });

  it('should verify delete comment by id request', () => {
    service.deleteComment(FAKE_COMMENT._id).subscribe(
      (postDetailDTO: PostDetailDTO) => expect(postDetailDTO).toBe(FAKE_COMMENT)
    );
    const request = httpMock.expectOne(`http://localhost:3000/api/comments/${FAKE_COMMENT._id}`);
    expect(request.request.method).toEqual('DELETE');
    request.flush(FAKE_COMMENT);
  });

  it('should verify create user request', () => {
    service.createUser(FAKE_USER).subscribe(
      (userDTO: UserDTO) => expect(userDTO).toBe(FAKE_USER)
    );
    const request = httpMock.expectOne('http://localhost:3000/api/user');
    expect(request.request.method).toEqual('POST');
    request.flush(FAKE_USER);
  });
});

export const FAKE_POSTS = [{
  _id: '5ecd2b3c671ce31402967797',
  nickname: 'Kovo',
  title: 'Experiencia',
  content: 'La peor experiencia es la mejor maestra',
  comments: []
}];

export const FAKE_COMMENT = {
  _id: '5ece6ee7671ce3140296779b',
  nickname: 'Pier Paolo Pasolini',
  comment: 'Lo mejor de la vida es el pasado, el presente y el futuro',
  date: '2020-05-27T13:45:11.410Z'
};

export const FAKE_USER = {
  username: 'admin',
  password: '1234'
};
