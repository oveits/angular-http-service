import { Component, OnInit } from '@angular/core';

import { DataService } from '../../services/data.service'

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.dataService.getPosts().subscribe((posts) => {
      console.log(posts);
    });
  }

}
