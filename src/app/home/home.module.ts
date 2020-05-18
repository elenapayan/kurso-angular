import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PostComponent } from './post/post.component';



@NgModule({
  declarations: [PostComponent],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  exports: [
    PostComponent
  ]
})
export class HomeModule { }
