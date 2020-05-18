import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

  // id: string;

  constructor() { }
  // constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    // this.id = this.activatedRoute.snapshot.params.id;
  }
}
