import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/internal/observable/of';
import { BackOfficeProxyService } from 'src/app/back-office/back-office-proxy.service';
import { FAKE_POSTS } from 'src/app/back-office/back-office-proxy.service.spec';
import { PostDetailComponent } from './post-detail.component';


describe('PostDetailComponent', () => {
  let component: PostDetailComponent;
  let fixture: ComponentFixture<PostDetailComponent>;
  let proxy: BackOfficeProxyService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [PostDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDetailComponent);
    component = fixture.componentInstance;
    proxy = TestBed.inject(BackOfficeProxyService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set home-post by id', async(() => {
    const spyProxy = spyOn(proxy, 'getPostById').and.returnValue(of(FAKE_POSTS[0]));
    component.getPostById();
    component.getPost$.subscribe(
      post => {
        expect(post._id).toEqual(FAKE_POSTS[0]._id);
        expect(post.nickname).toEqual(FAKE_POSTS[0].nickname);
        expect(post.title).toEqual(FAKE_POSTS[0].title);
        expect(post.content).toEqual(FAKE_POSTS[0].content);
        expect(post.comments).toEqual(FAKE_POSTS[0].comments);
      }
    );
    expect(spyProxy).toHaveBeenCalled();
  }));
});
