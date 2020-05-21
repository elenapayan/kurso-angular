import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BackOfficeService } from 'src/app/back-office/back-office.service';
import { PostDTO } from '../../dto/post.dto';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

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
