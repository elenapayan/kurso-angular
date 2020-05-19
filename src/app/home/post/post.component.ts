import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { PostDTO } from '../../dto/post.dto';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  getAllPost$: Observable<PostDTO[]>;
  id: string;

  constructor(private homeService: HomeService, private router: Router) { }

  ngOnInit(): void {
    this.getAllPost();
  }

  getAllPost(): void{
    this.getAllPost$ = this.homeService.getAllPost();
  }

  navToPostDetail(id) {
    this.router.navigate([`home/${id}`]);
  }

}
