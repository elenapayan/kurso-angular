import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/internal/observable/of';
import { BackOfficeProxyService } from '../back-office-proxy.service';
import { FAKE_POSTS } from '../back-office-proxy.service.spec';
import { PostBackComponent } from './post-back.component';


describe('PostBackComponent', () => {
  let component: PostBackComponent;
  let fixture: ComponentFixture<PostBackComponent>;
  let proxy: BackOfficeProxyService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule],
      declarations: [PostBackComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostBackComponent);
    component = fixture.componentInstance;
    proxy = TestBed.inject(BackOfficeProxyService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set back-posts', async(() => {
    const spyProxy = spyOn(proxy, 'getAllPost').and.returnValue(of(FAKE_POSTS));
    component.getAllPost();
    component.getAllPost$.subscribe(
      posts => {
        expect(posts[0]._id).toEqual(FAKE_POSTS[0]._id);
        expect(posts[0].nickname).toEqual(FAKE_POSTS[0].nickname);
        expect(posts[0].title).toEqual(FAKE_POSTS[0].title);
        expect(posts[0].content).toEqual(FAKE_POSTS[0].content);
        expect(posts[0].comments).toEqual(FAKE_POSTS[0].comments);
      }
    );
    expect(spyProxy).toHaveBeenCalled();
  }));

  // it('should set back-savepost', async(() => {
  //   const spyProxy = spyOn(proxy, 'savePost').and.returnValue(of(FAKE_POSTS[0]));
  //   component.savePost();
  //   component.subSave.add(
  //     post => {
  //       expect(post[0]).toEqual(FAKE_POSTS[0]);
  //       // expect(post.nickname).toEqual(FAKE_POSTS[0].nickname);
  //       // expect(post.title).toEqual(FAKE_POSTS[0].title);
  //       // expect(post.content).toEqual(FAKE_POSTS[0].content);
  //       // expect(post.comments).toEqual(FAKE_POSTS[0].comments);
  //     }
  //   );
  //   expect(spyProxy).toHaveBeenCalled();
  // }));
});
