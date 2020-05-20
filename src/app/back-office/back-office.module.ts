import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BackOfficeComponent } from './back-office/back-office.component';
import { PostBackComponent } from './post-back/post-back.component';
import { PostDetailBackComponent } from './post-detail-back/post-detail-back.component';


const ROUTES: Routes = [
  {
    path: '', component: BackOfficeComponent,
    children: [
      { path: '', component: PostBackComponent },
      { path: ':id', component: PostDetailBackComponent }
    ],
  }
];


@NgModule({
  declarations: [PostDetailBackComponent, PostBackComponent, BackOfficeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class BackOfficeModule { }
