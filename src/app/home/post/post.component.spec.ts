import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/internal/observable/of';
import { BackOfficeProxyService } from 'src/app/back-office/back-office-proxy.service';
import { FAKE_POSTS } from 'src/app/back-office/back-office-proxy.service.spec';
import { PostComponent } from './post.component';


describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let proxy: BackOfficeProxyService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [PostComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    proxy = TestBed.inject(BackOfficeProxyService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set home-posts', async(() => {
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
});
