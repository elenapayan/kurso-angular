import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { Post } from '../models/post.model';
import { BackOfficeProxyService } from './back-office-proxy.service';
import { FAKE_POSTS } from './back-office-proxy.service.spec';
import { BackOfficeService } from './back-office.service';


describe('BackOfficeService', () => {
  let service: BackOfficeService;
  let proxy: BackOfficeProxyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(BackOfficeService);
    proxy = TestBed.inject(BackOfficeProxyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should mapper dto to model on getAllPost', async(() => {
    const spyProxy = spyOn(proxy, 'getAllPost').and.returnValue(of(FAKE_POSTS));
    service.getAllPost().subscribe(
      (posts: Post[]) => {
        expect(posts[0]._id).toEqual(FAKE_POSTS[0]._id);
        expect(posts[0].nickname).toEqual(FAKE_POSTS[0].nickname);
        expect(posts[0].title).toEqual(FAKE_POSTS[0].title);
        expect(posts[0].content).toEqual(FAKE_POSTS[0].content);
        expect(posts[0].comments).toEqual(FAKE_POSTS[0].comments);
      }
    );
  }));

  it('should mapper dto to model on getPostById', async(() => {
    const spyProxy = spyOn(proxy, 'getPostById').and.returnValue(of(FAKE_POSTS[0]));
    service.getPostById(FAKE_POSTS[0]._id).subscribe(
      (posts: Post) => {
        expect(posts._id).toEqual(FAKE_POSTS[0]._id);
        expect(posts.nickname).toEqual(FAKE_POSTS[0].nickname);
        expect(posts.title).toEqual(FAKE_POSTS[0].title);
        expect(posts.content).toEqual(FAKE_POSTS[0].content);
        expect(posts.comments).toEqual(FAKE_POSTS[0].comments);
      }
    );
  }));

  it('should mapper dto to model on deletePostById', async(() => {
    const spyProxy = spyOn(proxy, 'deletePost').and.returnValue(of(FAKE_POSTS[0]));
    service.getPostById(FAKE_POSTS[0]._id).subscribe(
      (posts: Post) => {
        expect(posts._id).toEqual(FAKE_POSTS[0]._id);
        expect(posts.nickname).toEqual(FAKE_POSTS[0].nickname);
        expect(posts.title).toEqual(FAKE_POSTS[0].title);
        expect(posts.content).toEqual(FAKE_POSTS[0].content);
        expect(posts.comments).toEqual(FAKE_POSTS[0].comments);
      }
    );
  }));

  it('should mapper model to dto on savePost', async(() => {
    const spyProxy = spyOn(proxy, 'savePost').and.returnValue(of(FAKE_POSTS[0]));
    service.savePost(FAKE_POSTS[0]).subscribe(
      (posts: Post) => {
        expect(posts._id).toEqual(FAKE_POSTS[0]._id);
        expect(posts.nickname).toEqual(FAKE_POSTS[0].nickname);
        expect(posts.title).toEqual(FAKE_POSTS[0].title);
        expect(posts.content).toEqual(FAKE_POSTS[0].content);
        expect(posts.comments).toEqual(FAKE_POSTS[0].comments);
      }
    );
  }));

  it('should mapper model to dto on updatePost', async(() => {
    const spyProxy = spyOn(proxy, 'updatePost').and.returnValue(of(FAKE_POSTS[0]));
    service.updatePost(FAKE_POSTS[0]._id, FAKE_POSTS[0]).subscribe(
      (posts: Post) => {
        expect(posts._id).toEqual(FAKE_POSTS[0]._id);
        expect(posts.nickname).toEqual(FAKE_POSTS[0].nickname);
        expect(posts.title).toEqual(FAKE_POSTS[0].title);
        expect(posts.content).toEqual(FAKE_POSTS[0].content);
        expect(posts.comments).toEqual(FAKE_POSTS[0].comments);
      }
    );
  }));



});
