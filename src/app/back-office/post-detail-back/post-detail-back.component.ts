import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { PostDetailDTO } from 'src/app/dto/post-detail.dto';
import { Post } from 'src/app/models/post.model';
import { PostDetailStoreService } from '../postDetail-store.service';


@Component({
  selector: 'app-post-detail-back',
  templateUrl: './post-detail-back.component.html',
  styleUrls: ['./post-detail-back.component.scss']
})
export class PostDetailBackComponent implements OnInit {


  getPost: Observable<Post>;
  comment: PostDetailDTO;
  createComment: FormGroup;
  show: boolean;
  postId: string;
  commentId: string;


  constructor(private postDetailStore: PostDetailStoreService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.postId = this.activatedRoute.snapshot.params.id;
    this.postDetailStore.init(this.postId);
    this.getPost = this.postDetailStore.get$();
    this.show = false;
    this.createComment = new FormGroup({
      comment: new FormControl('', [Validators.required]),
      nickname: new FormControl('', [Validators.required])
    });
    this.commentId = '';
  }

  addComment(): void {
    const createComment = this.createComment.value;
    this.postDetailStore.addComment$(this.postId, createComment);
  }

  updateComment(): void {
    const modifyComment = this.createComment.value;
    this.postDetailStore.updateComment$(this.commentId, modifyComment);
  }

  handleComment(): void {
    if (this.commentId) {
      this.updateComment();
    } else {
      this.addComment();
    }
  }

  deleteComment(id): void {
    this.postDetailStore.deleteComment$(id);
  }

  showForm(id): void {
    console.log('show', id);
    this.show = !this.show;
    this.commentId = id;
  }

  reset(): void {
    this.createComment = new FormGroup({
      comment: new FormControl('', [Validators.required]),
      nickname: new FormControl('', [Validators.required])
    });
  }
}
