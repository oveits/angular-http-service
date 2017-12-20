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
  truetest : string = 'true';
  isLoading : string = 'true'

  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.isLoading = "true";
    this.page = 1;
    this.dataService.getPosts(this.page).subscribe((posts) => {
      //console.log(posts);
      this.posts = posts;
      this.isLoading = "false";
    });
  }

  appendPage(){
    this.isLoading = "true";
    //this.posts = undefined;
    this.page += 1;
    this.dataService.getPosts(this.page).subscribe((posts) => {
      //console.log(posts);
      this.posts = this.posts.concat(posts);
      console.log(posts)
      this.isLoading = "false";
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