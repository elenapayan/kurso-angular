import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Subscription } from 'rxjs/internal/Subscription';
import { PostDetailDTO } from 'src/app/dto/post-detail.dto';
import { Post } from 'src/app/models/post.model';
import { BackOfficeService } from '../back-office.service';


@Component({
  selector: 'app-post-detail-back',
  templateUrl: './post-detail-back.component.html',
  styleUrls: ['./post-detail-back.component.scss']
})
export class PostDetailBackComponent implements OnInit, OnDestroy {

  getPost$: Observable<Post>;
  subDelete: Subscription;
  subAdd: Subscription;
  subUpdate: Subscription;
  comment: PostDetailDTO;
  createComment: FormGroup;
  show: boolean;
  postId: string;
  commentId: string;


  constructor(private backService: BackOfficeService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getPostById();
    this.show = false;
    this.createComment = new FormGroup({
      comment: new FormControl('', [Validators.required]),
      nickname: new FormControl('', [Validators.required])
    });
    this.commentId = '';
  }

  getPostById(): void {
    this.postId = this.activatedRoute.snapshot.params.id;
    this.getPost$ = this.backService.getPostById(this.postId);
  }

  addComment(): void {
    const createComment = this.createComment.value;
    this.subAdd = this.backService.addComment(this.postId, createComment).subscribe();
  }

  updateComment(): void {
    const modifyComment = this.createComment.value;
    this.subUpdate = this.backService.updateComment(this.commentId, modifyComment).subscribe();
  }

  handleComment(): void {
    if (this.commentId) {
      this.updateComment();
    } else {
      this.addComment();
    }
  }

  deleteComment(id): void {
    this.subDelete = this.backService.deleteComment(id).subscribe();
  }

  showForm(id): void {
    this.show = !this.show;
    this.commentId = id;
  }

  ngOnDestroy(): void {
    if (this.subDelete) {
      this.subDelete.unsubscribe();
    }
    if (this.subAdd) {
      this.subAdd.unsubscribe();
    }
    if (this.subUpdate) {
      this.subUpdate.unsubscribe();
    }
  }
}
