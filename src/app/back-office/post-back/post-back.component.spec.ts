import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostBackComponent } from './post-back.component';

describe('PostBackComponent', () => {
  let component: PostBackComponent;
  let fixture: ComponentFixture<PostBackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostBackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
