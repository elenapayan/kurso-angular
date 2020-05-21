import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { BackOfficeService } from 'src/app/back-office/back-office.service';
import { PostDTO } from '../../dto/post.dto';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

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
    this.router.navigate([`home/${id}`]);
  }

}
