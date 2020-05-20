import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PostBackComponent } from './post-back/post-back.component';
import { PostDetailBackComponent } from './post-detail-back/post-detail-back.component';


const ROUTES: Routes = [
  { path: '', component: PostBackComponent },
  { path: ':id', component: PostDetailBackComponent }
];


@NgModule({
  declarations: [PostDetailBackComponent, PostBackComponent, LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [LoginComponent]
})
export class BackOfficeModule { }
