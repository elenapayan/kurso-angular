import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { PostDetail } from '../models/post-detail.model';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';
import { BackOfficeProxyService } from './back-office-proxy.service';
import { FAKE_COMMENT, FAKE_POSTS, FAKE_USER } from './back-office-proxy.service.spec';
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
      (post: Post[]) => {
        expect(post[0]._id).toEqual(FAKE_POSTS[0]._id);
        expect(post[0].nickname).toEqual(FAKE_POSTS[0].nickname);
        expect(post[0].title).toEqual(FAKE_POSTS[0].title);
        expect(post[0].content).toEqual(FAKE_POSTS[0].content);
        expect(post[0].comments).toEqual(FAKE_POSTS[0].comments);
      }
    );
  }));

  it('should mapper dto to model on getPostById', async(() => {
    const spyProxy = spyOn(proxy, 'getPostById').and.returnValue(of(FAKE_POSTS[0]));
    service.getPostById(FAKE_POSTS[0]._id).subscribe(
      (post: Post) => {
        expect(post._id).toEqual(FAKE_POSTS[0]._id);
        expect(post.nickname).toEqual(FAKE_POSTS[0].nickname);
        expect(post.title).toEqual(FAKE_POSTS[0].title);
        expect(post.content).toEqual(FAKE_POSTS[0].content);
        expect(post.comments).toEqual(FAKE_POSTS[0].comments);
      }
    );
  }));

  it('should mapper dto to model on deletePostById', async(() => {
    const spyProxy = spyOn(proxy, 'deletePost').and.returnValue(of(FAKE_POSTS[0]));
    service.deletePost(FAKE_POSTS[0]._id).subscribe(
      (post: Post) => {
        expect(post._id).toEqual(FAKE_POSTS[0]._id);
        expect(post.nickname).toEqual(FAKE_POSTS[0].nickname);
        expect(post.title).toEqual(FAKE_POSTS[0].title);
        expect(post.content).toEqual(FAKE_POSTS[0].content);
        expect(post.comments).toEqual(FAKE_POSTS[0].comments);
      }
    );
  }));

  it('should mapper model to dto on savePost', async(() => {
    const spyProxy = spyOn(proxy, 'savePost').and.returnValue(of(FAKE_POSTS[0]));
    service.savePost(FAKE_POSTS[0]).subscribe(
      (post: Post) => {
        expect(post._id).toEqual(FAKE_POSTS[0]._id);
        expect(post.nickname).toEqual(FAKE_POSTS[0].nickname);
        expect(post.title).toEqual(FAKE_POSTS[0].title);
        expect(post.content).toEqual(FAKE_POSTS[0].content);
        expect(post.comments).toEqual(FAKE_POSTS[0].comments);
      }
    );
  }));

  it('should mapper model to dto on updatePost', async(() => {
    const spyProxy = spyOn(proxy, 'updatePost').and.returnValue(of(FAKE_POSTS[0]));
    service.updatePost(FAKE_POSTS[0]._id, FAKE_POSTS[0]).subscribe(
      (post: Post) => {
        expect(post._id).toEqual(FAKE_POSTS[0]._id);
        expect(post.nickname).toEqual(FAKE_POSTS[0].nickname);
        expect(post.title).toEqual(FAKE_POSTS[0].title);
        expect(post.content).toEqual(FAKE_POSTS[0].content);
        expect(post.comments).toEqual(FAKE_POSTS[0].comments);
      }
    );
  }));

  it('should mapper dto to model on deleteCommentById', async(() => {
    const spyProxy = spyOn(proxy, 'deleteComment').and.returnValue(of(FAKE_COMMENT));
    service.deleteComment(FAKE_COMMENT._id).subscribe(
      (postDetail: PostDetail) => {
        expect(postDetail._id).toEqual(FAKE_COMMENT._id);
        expect(postDetail.nickname).toEqual(FAKE_COMMENT.nickname);
        expect(postDetail.comment).toEqual(FAKE_COMMENT.comment);
        expect(postDetail.date).toEqual(FAKE_COMMENT.date);
      }
    );
  }));

  it('should mapper model to dto on addComment', async(() => {
    const spyProxy = spyOn(proxy, 'addComment').and.returnValue(of(FAKE_COMMENT));
    service.addComment(FAKE_POSTS[0]._id, FAKE_COMMENT).subscribe(
      (postDetail: PostDetail) => {
        expect(postDetail._id).toEqual(FAKE_COMMENT._id);
        expect(postDetail.nickname).toEqual(FAKE_COMMENT.nickname);
        expect(postDetail.comment).toEqual(FAKE_COMMENT.comment);
        expect(postDetail.date).toEqual(FAKE_COMMENT.date);
      }
    );
  }));

  it('should mapper model to dto on updateComment', async(() => {
    const spyProxy = spyOn(proxy, 'updateComment').and.returnValue(of(FAKE_COMMENT));
    service.updateComment(FAKE_COMMENT._id, FAKE_COMMENT).subscribe(
      (postDetail: PostDetail) => {
        expect(postDetail._id).toEqual(FAKE_COMMENT._id);
        expect(postDetail.nickname).toEqual(FAKE_COMMENT.nickname);
        expect(postDetail.comment).toEqual(FAKE_COMMENT.comment);
        expect(postDetail.date).toEqual(FAKE_COMMENT.date);
      }
    );
  }));

  it('should mapper model to dto on createUser', async(() => {
    const spyProxy = spyOn(proxy, 'createUser').and.returnValue(of(FAKE_USER));
    service.createUser(FAKE_USER).subscribe(
      (user: User) => {
        expect(user.username).toEqual(FAKE_USER.username);
        expect(user.password).toEqual(FAKE_USER.password);
      }
    );
  }));

});
