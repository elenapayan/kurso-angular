import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { PostDTO } from 'src/app/dto/post.dto';
import { BackOfficeService } from '../back-office.service';


@Component({
  selector: 'app-post-back',
  templateUrl: './post-back.component.html',
  styleUrls: ['./post-back.component.scss']
})
export class PostBackComponent implements OnInit {

  getAllPost$: Observable<PostDTO[]>;
  id: string;

  constructor(private backService: BackOfficeService, private router: Router) { }

  ngOnInit(): void {
    this.getAllPost();
  }

  getAllPost(): void{
    this.getAllPost$ = this.backService.getAllPost();
  }

  navToPostDetail(id) {
    this.router.navigate([`backOffice/${id}`]);
  }

}
