import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { HomeService } from '../home.service';
import { PostDTO } from '../post.dto';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  getPost$: Observable<PostDTO>;
  id: string;
  // subscription: Subscription;
  // post: any;


  constructor(private homeService: HomeService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getPostById();
  }

  getPostById(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    this.getPost$ = this.homeService.getPostById(this.id);
    // this.subscription = this.homeService.getPostById(this.id).subscribe((res) => {
    //   this.post = res;
    // })
  }

  // ngOnDetroy(): void {
  //   this.subscription.unsubscribe();
  // }
}
