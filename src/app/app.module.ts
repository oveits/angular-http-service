import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BlogComponent } from './components/blog/blog.component';
import { DataService } from './services/data.service';
import { HttpModule } from '@angular/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BlogentryComponent } from './components/blogentry/blogentry.component';


@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    BlogentryComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    InfiniteScrollModule 
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
