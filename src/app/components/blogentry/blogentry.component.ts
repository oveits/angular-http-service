import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service'

@Component({
  selector: 'app-blogentry',
  templateUrl: './blogentry.component.html',
  styleUrls: ['./blogentry.component.css']
})
export class BlogentryComponent implements OnInit {

  ID: number;
  title: string;
  content: string;
  excerpt: string;
  userId: number;
  URL: string;
  userName: string;
  dateString: string;


  constructor(private route: ActivatedRoute, private dataService:DataService) { }

  ngOnInit() {

    // get id from route:
    var id;
    this.route.paramMap.subscribe((params) => {
      console.log(params.get('id'));
      id = params.get('id');
    });

    // get post from dataService
    this.dataService.getPost(id).subscribe((post) => {
      this.ID = post.ID;
      this.title = post.title;
      this.content = post.content;
      this.excerpt = post.excerpt;
      this.userId = post.userId;
      this.URL = post.URL;
      this.userName = post.author.first_name + " " + post.author.last_name;
      this.dateString = post.date;
    });    
  }

}
