import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
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
    ReactiveFormsModule,
    HttpClientModule,
    TableModule,
    InputTextModule,
    CardModule,
    ButtonModule,
    RouterModule.forChild(ROUTES)
  ]
})
export class BackOfficeModule { }
