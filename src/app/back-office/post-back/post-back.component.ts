import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { PostDTO } from 'src/app/dto/post.dto';
import { Post } from 'src/app/models/post.model';
import { NotificacionesBusService } from 'src/app/notificaciones-bus.service';
import { PostsStoreService } from '../post-store.service';


@Component({
  selector: 'app-post-back',
  templateUrl: './post-back.component.html',
  styleUrls: ['./post-back.component.scss']
})
export class PostBackComponent implements OnInit {

  getAllPost$: Observable<Post[]>;
  post: PostDTO;
  createPost: FormGroup;
  show: boolean;
  id: string;

  titleErrorsMessages = {};


  constructor(private postStore: PostsStoreService, private notificacionesBus: NotificacionesBusService, private router: Router) { }

  ngOnInit(): void {
    this.postStore.init();
    this.getAllPost();
    this.show = false;
    this.createPost = new FormGroup({
      nickname: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
    });
    this.id = '';
    this.titleErrorsMessages = {
      required: 'El campo es requerido',
    };
  }

  getAllPost(): void {
    this.getAllPost$ = this.postStore.get$();
  }

  savePost(): void {
    const createForm: Post = this.createPost.value;
    this.postStore.createPost$(createForm)
      .then(() => {
        this.notificacionesBus.showSuccess('The post has been published');
        this.showForm('');
        this.reset();
      })
      .catch(() => this.notificacionesBus.showError('Sorry, there has been an unexpected error, try again later'));
  }

  updatePost(): void {
    const updateForm: Post = this.createPost.value;
    this.postStore.updatePost$(this.id, updateForm)
      .then(() => {
        this.notificacionesBus.showSuccess('The post has been modified');
        this.showForm('');
        this.reset();
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
    this.reset();
  }

  navToPostDetail(id: string): void {
    this.router.navigate([`backOffice/${id}`]);
  }

  reset(): void {
    this.createPost = new FormGroup({
      nickname: new FormControl(''),
      title: new FormControl(''),
      content: new FormControl('')
    });
  }
}
