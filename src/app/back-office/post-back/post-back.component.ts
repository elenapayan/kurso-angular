import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { UserStoreService } from 'src/app/auth/user.store.service';
import { PostDTO } from 'src/app/dto/post.dto';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { NotificacionesBusService } from 'src/app/notificaciones-bus.service';
import { PostsStoreService } from '../post-store.service';


@Component({
  selector: 'app-post-back',
  templateUrl: './post-back.component.html',
  styleUrls: ['./post-back.component.scss']
})
export class PostBackComponent implements OnInit {

  getAllPost$: Observable<Post[]>;
  user: Observable<User[]>;
  post: PostDTO;
  createPost: FormGroup;
  show: boolean;
  id: string;
  // titleErrorsMessages = {};

  constructor(
    private postStore: PostsStoreService,
    private notificacionesBus: NotificacionesBusService,
    private userStore: UserStoreService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.postStore.init();
    this.getAllPost$ = this.postStore.get$();
    this.userStore.init();
    this.user = this.userStore.get$();
    this.show = false;
    this.createPost = new FormGroup({
      nickname: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(20)]),
      title: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]),
      content: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(500)]),
    });
    this.id = '';
    // this.titleErrorsMessages = {
    //   required: 'El campo es requerido',
    // };
  }

  savePost(): void {
    const createForm: Post = this.createPost.value;
    this.postStore.createPost$(createForm)
      .then(() => {
        this.notificacionesBus.showSuccess('The post has been published');
        this.showForm('');
      })
      .catch(() => this.notificacionesBus.showError('Sorry, there has been an unexpected error, try again later'));
  }

  updatePost(): void {
    const updateForm: Post = this.createPost.value;
    this.postStore.updatePost$(this.id, updateForm)
      .then(() => {
        this.notificacionesBus.showSuccess('The post has been modified');
        this.showForm('');
      })
      .catch(() => this.notificacionesBus.showError('Sorry, there has been an unexpected error, try again later'));
  }

  handlePost(): void {
    if (this.id) {
      this.updatePost();
    } else {
      this.savePost();
    }
  }

  deletePost(id: string): void {
    this.postStore.deletePost$(id)
      .then(() => {
        this.notificacionesBus.showSuccess('The post has been deleted');
      })
      .catch(() => this.notificacionesBus.showError('Sorry, there has been an unexpected error, try again later'));
  }

  showForm(id: string): void {
    this.show = !this.show;
    this.id = id;
    this.createPost.reset();
  }

  navToPostDetail(id: string): void {
    this.router.navigate([`backOffice/${id}`]);
  }
}
