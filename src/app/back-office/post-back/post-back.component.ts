import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import { PostDTO } from 'src/app/dto/post.dto';
import { Post } from 'src/app/models/post.model';
import { BackOfficeService } from '../back-office.service';


@Component({
  selector: 'app-post-back',
  templateUrl: './post-back.component.html',
  styleUrls: ['./post-back.component.scss']
})
export class PostBackComponent implements OnInit, OnDestroy {

  getAllPost$: Observable<Post[]>;
  subDelete: Subscription;
  subSave: Subscription;
  subUpdate: Subscription;
  post: PostDTO;
  createPost: FormGroup;
  show: boolean;
  id: string;


  constructor(private backService: BackOfficeService, private router: Router) { }

  ngOnInit(): void {
    this.getAllPost();
    this.show = false;
    this.createPost = new FormGroup({
      nickname: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
    });
    this.id = '';
  }

  getAllPost(): void {
    this.getAllPost$ = this.backService.getAllPost();
  }

  savePost(): void {
    const createForm = this.createPost.value;
    this.subSave = this.backService.savePost(createForm).subscribe();
  }

  updatePost(): void {
    const updateForm = this.createPost.value;
    this.subUpdate = this.backService.updatePost(this.id, updateForm).subscribe();
  }

  handlePost(): void {
    if (this.id) {
      this.updatePost();
    } else {
      this.savePost();
    }
  }

  deletePost(id: string): void {
    this.subDelete = this.backService.deletePost(id).subscribe();
  }

  showForm(id: string): void {
    this.show = !this.show;
    this.id = id;
  }

  navToPostDetail(id: string): void {
    this.router.navigate([`backOffice/${id}`]);
  }

  ngOnDestroy(): void {
    if (this.subSave) {
      this.subSave.unsubscribe();
    }
    if (this.subDelete) {
      this.subDelete.unsubscribe();
    }
    if (this.subUpdate) {
      this.subUpdate.unsubscribe();
    }
  }
}
