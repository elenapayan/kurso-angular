import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { PostDTO } from 'src/app/dto/post.dto';
import { BackOfficeService } from '../back-office.service';

@Component({
  selector: 'app-post-detail-back',
  templateUrl: './post-detail-back.component.html',
  styleUrls: ['./post-detail-back.component.scss']
})
export class PostDetailBackComponent implements OnInit {

  getPost$: Observable<PostDTO>;
  id: string;

  constructor(private backService: BackOfficeService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getPostById();
  }

  getPostById(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.getPost$ = this.backService.getPostById(this.id);
  }

}
