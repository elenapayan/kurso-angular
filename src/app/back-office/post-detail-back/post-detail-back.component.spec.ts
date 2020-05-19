import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDetailBackComponent } from './post-detail-back.component';

describe('PostDetailBackComponent', () => {
  let component: PostDetailBackComponent;
  let fixture: ComponentFixture<PostDetailBackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostDetailBackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDetailBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
