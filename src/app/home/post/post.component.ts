import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HomeService } from '../home.service';
import { PostDTO } from '../post.dto';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  getAllPost$: Observable<PostDTO[]>;

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.getAllPost$ = this.homeService.getAllPost();
  }

}
