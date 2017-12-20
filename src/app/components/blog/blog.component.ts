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
  isLoading : string = 'true';
  loadedNumber : number = 0;

  constructor(private dataService:DataService) { }

  ngOnInit() {;
    this.isLoading = "true";
    this.page = 1;
    this.dataService.getPosts(this.page).subscribe((posts) => {
      //console.log(posts);
      this.posts = posts;
      this.isLoading = "false";
      this.loadedNumber = posts.length;
    });
  }

  appendPage(){
    console.log("appendPage called");
    this.isLoading = "true";
    this.page += 1;
    this.dataService.getPosts(this.page).subscribe((posts) => {
      //console.log(posts);
      if(posts.length > 0) {
        this.loadedNumber += posts.length;
        this.posts = this.posts.concat(posts);  
      } else {
        this.page -= 1;
      }
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
  userId: number,
  URL: string
}