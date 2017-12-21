import { Component, OnInit } from '@angular/core';

import { DataService } from '../../services/data.service'

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  httpCached : boolean = true;
  posts : Post[] = [];
  page : number = 0;
  isLoading : string = 'true';
  loadedNumber : number = 0;

  constructor(private dataService:DataService) { }

  ngOnInit() {
    // get first page:
    this.appendPage();
  }

  appendPage(){
    if ( this.httpCached ){
      return this.appendPageCachedPromise();
    } else {
      return this.appendPageUnCached();
    }
  }

  appendPageCachedPromise(){
    console.log("appendPageCachedPromise called");
    this.isLoading = "true";
    this.page += 1;
    this.dataService.getCachedPromisePosts(this.page).then(res => {
      let posts=res.json().posts;
      //console.log(posts);
      if(posts.length > 0) {
        this.loadedNumber += posts.length;
        this.posts = this.posts.concat(posts);  
      } else {
        this.page -= 1;
      }
      //console.log(posts)
      this.isLoading = "false";
    });
  }

  appendPageUnCached(){
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
      //console.log(posts)
      this.isLoading = "false";
    });
  }
}

interface Post{
  ID: number,
  title: string,
  content: string,
  excerpt: string,
  userId: number,
  URL: string
}