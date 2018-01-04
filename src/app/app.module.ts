import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BlogComponent } from './components/blog/blog.component';
import { DataService } from './services/data.service';
import { HttpModule } from '@angular/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BlogentryComponent } from './components/blogentry/blogentry.component';
import { RouterModule, Routes } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

const appRoutes : Routes = [
  { 
    path: 'blog', 
    component: BlogComponent 
  },
  {
    path: 'blog/:id',
    component: BlogentryComponent 
  }
];


@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    BlogentryComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    HttpModule,
    InfiniteScrollModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
