import { Component, OnInit } from '@angular/core';

import { DataService } from '../../services/data.service'

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  posts : Post[];
  page : number;

  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.page = 1;
    this.dataService.getPosts(this.page).subscribe((posts) => {
      //console.log(posts);
      this.posts = posts;
    });
  }

  nextPage(){
    this.posts = undefined;
    this.page += 1;
    this.dataService.getPosts(this.page).subscribe((posts) => {
      //console.log(posts);
      this.posts = posts;
    });
  }

  previousPage(){
    this.posts = undefined;
    this.page -= 1;
    this.dataService.getPosts(this.page).subscribe((posts) => {
      //console.log(posts);
      this.posts = posts;
    });
  }

}

interface Post{
  id: number,
  title: string,
  content: string,
  excerpt: string,
  userId: number
}