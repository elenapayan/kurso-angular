import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostComponent } from './post/post.component';

const ROUTES: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', component: PostComponent },
      { path: ':id', component: PostDetailComponent }
    ]
  }];

@NgModule({
  declarations: [
    PostComponent,
    PostDetailComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES)
  ],
  exports: [
    PostComponent
  ]
})
export class HomeModule { }
