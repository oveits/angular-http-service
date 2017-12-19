import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(public http:Http) { 
    console.log('Data Service connected...')
  }

  getPosts(page : number = 1) {
    return this.http.get('https://public-api.wordpress.com/rest/v1.1/sites/oliverveits.wordpress.com/posts?page=' + page)
    .map(res => res.json().posts);
  }

}

interface Post{
  id: number,
  title: string,
  body: string,
  userId: number
}
