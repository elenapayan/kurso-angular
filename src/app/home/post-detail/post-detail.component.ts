import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PostDTO } from '../../dto/post.dto';
import { HomeService } from '../home.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  getPost$: Observable<PostDTO>;
  id: string;


  constructor(private homeService: HomeService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getPostById();
  }

  getPostById(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.getPost$ = this.homeService.getPostById(this.id);
  }
}
