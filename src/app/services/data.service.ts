import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  promisePage1: any;

  constructor(public http:Http) { 
    console.log('Data Service connected...')
  }

  getPosts(page : number = 1) {
    return this.http.get('https://public-api.wordpress.com/rest/v1.1/sites/oliverveits.wordpress.com/posts?page=' + page)
    .map(res => res.json().posts);
  }

  // cached posts for page 1, uncached posts for other pages:
  getCachedPromisePosts(page : number = 1) {
    if(page == 1){
      if(!this.promisePage1){
        this.promisePage1 = this.http.get('https://public-api.wordpress.com/rest/v1.1/sites/oliverveits.wordpress.com/posts?page=' + page).toPromise();
      }
      return this.promisePage1;
    } else {
    return this.http.get('https://public-api.wordpress.com/rest/v1.1/sites/oliverveits.wordpress.com/posts?page=' + page).toPromise();
    //.then(res => res.json().posts);
    }
  }

  getPost(id : number) {
    return this.http.get('https://public-api.wordpress.com/rest/v1.1/sites/oliverveits.wordpress.com/posts/' + id)
    .map(res => res.json());
  }

}

interface Post{
  id: number,
  title: string,
  body: string,
  userId: number
}
