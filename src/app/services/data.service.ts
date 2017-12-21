import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  promiseCacheMap: Map<number, Promise<any>>;

  constructor(public http:Http) { 
    console.log('Data Service connected...')
  }

  getPosts(page : number = 1) {
    console.log("getPosts called for page " + page)
    var ret = this.http.get('https://public-api.wordpress.com/rest/v1.1/sites/oliverveits.wordpress.com/posts?page=' + page)
    .map(res => res.json().posts);
    console.log("getPosts updated from network for page " + page)
    return ret;
  }

  // cached posts for page 1, uncached posts for other pages:
  getCachedPromisePosts(page : number = 1) {
    console.log("getCachedPromisePosts called for page " + page)
    if(!this.promiseCacheMap){
      this.promiseCacheMap = new Map<number, Promise<any>>();
    }

    if(!this.promiseCacheMap[page]){
      this.promiseCacheMap[page] = this.http.get('https://public-api.wordpress.com/rest/v1.1/sites/oliverveits.wordpress.com/posts?page=' + page).toPromise();
      console.log("getCachedPromisePosts updated from network for page " + page)
    }
    return this.promiseCacheMap[page];
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
