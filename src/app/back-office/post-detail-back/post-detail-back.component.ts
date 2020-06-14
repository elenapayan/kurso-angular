import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { UserStoreService } from 'src/app/auth/user.store.service';
import { PostDetailDTO } from 'src/app/dto/post-detail.dto';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { NotificacionesBusService } from 'src/app/notificaciones-bus.service';
import { PostDetailStoreService } from '../postDetail-store.service';


@Component({
  selector: 'app-post-detail-back',
  templateUrl: './post-detail-back.component.html',
  styleUrls: ['./post-detail-back.component.scss']
})
export class PostDetailBackComponent implements OnInit {


  getPost: Observable<Post>;
  user: Observable<User[]>;
  comment: PostDetailDTO;
  createComment: FormGroup;
  show: boolean;
  postId: string;
  commentId: string;


  constructor(
    private postDetailStore: PostDetailStoreService,
    private notificacionesBus: NotificacionesBusService,
    private userStore: UserStoreService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.postId = this.activatedRoute.snapshot.params.id;
    this.postDetailStore.init(this.postId);
    this.getPost = this.postDetailStore.get$();
    this.userStore.init();
    this.user = this.userStore.get$();
    this.show = false;
    this.createComment = new FormGroup({
      comment: new FormControl('', [Validators.required]),
      nickname: new FormControl('', [Validators.required])
    });
    this.commentId = '';
  }

  addComment(): void {
    const createComment = this.createComment.value;
    this.postDetailStore.addComment$(this.postId, createComment)
      .then(() => {
        this.notificacionesBus.showSuccess('The comment has been published');
        this.showForm('');
        this.reset();
      })
      .catch(err => this.notificacionesBus.showError(err.error.message));
  }

  updateComment(): void {
    const modifyComment = this.createComment.value;
    this.postDetailStore.updateComment$(this.commentId, modifyComment)
      .then(() => {
        this.notificacionesBus.showSuccess('The comment has been modified');
        this.showForm('');
        this.reset();
      })
      .catch(err => this.notificacionesBus.showError(err.error.message));
  }

  handleComment(): void {
    if (this.commentId) {
      this.updateComment();
    } else {
      this.addComment();
    }
  }

  deleteComment(id): void {
    this.postDetailStore.deleteComment$(id)
      .then(() => {
        this.notificacionesBus.showSuccess('The comment has been deleted');
      })
      .catch(() => this.notificacionesBus.showError('Sorry, there has been an unexpected error, try again later'));
  }

  showForm(id): void {
    this.show = !this.show;
    this.commentId = id;
    this.reset();
  }

  reset(): void {
    this.createComment = new FormGroup({
      comment: new FormControl(''),
      nickname: new FormControl('')
    });
  }
}
