import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackOfficeComponent } from './back-office/back-office.component';
import { PostBackComponent } from './post-back/post-back.component';
import { PostDetailBackComponent } from './post-detail-back/post-detail-back.component';


const ROUTES: Routes = [
  { path: '', component: PostBackComponent },
  { path: ':id', component: PostDetailBackComponent }
];


@NgModule({
  declarations: [BackOfficeComponent, PostDetailBackComponent, PostBackComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class BackOfficeModule { }
