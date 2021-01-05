import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { userService } from '../../services/user.service';
import { videoService } from '../../services/video.service';
import { Video } from '../../models/video';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public page_title: string;
  public identity: User;
  public token: string;
  public videos: Video;
  public status: string;
  public page: number;
  public next_page: number;
  public prev_page: number;
  public number_page = [];

  constructor(private _userService: userService,
              private _videoService: videoService,
              private _router: Router,
              private _route: ActivatedRoute) {
    this.page_title = 'Videos Favoritos';
    
   }

  ngOnInit(): void {
    this.loadUser();
    this.pageActual();
  }

  pageActual(){
    this._route.params.subscribe( params => {
      let page = +params['page'];
      
      if(!page){
        page = 1;
        this.next_page = 1;
        this.prev_page = 1;
      }
      this.getVideos(page);
    });
  }

  loadUser(){
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  getVideos(page: number){
    this._videoService.getVideos(this.token, page).subscribe(
      resp => {
        this.status = 'success';
        this.videos = resp.video;
        let number_page = [];
        for(var i=1;i<=resp.total_page;i++){
          number_page.push(i);
        }
        this.number_page = number_page;
        if(page>=2){
          this.prev_page = page -1;
        } else {
          this.prev_page = 1;
        }
        if(page < resp.total_page){
          this.next_page = page + 1;
        } else {
          this.next_page = resp.total_page;
        }
      }, 
      error => {
        this.status = 'error';
        console.log('error');
      }
    )
  }

  getThumb(url, size) {
    var video, results, thumburl;
    
     if (url === null) {
         return '';
     }
     
     results = url.match('[\\?&]v=([^&#]*)');
     video   = (results === null) ? url : results[1];
    
     if(size != null) {
         thumburl = 'http://img.youtube.com/vi/' + video + '/'+ size +'.jpg';
     }else{
         thumburl = 'http://img.youtube.com/vi/' + video + '/mqdefault.jpg';
     }
    
      return thumburl;
        
  }

  deleteVideo(id){
    this._videoService.delete(this.token, id).subscribe(
      resp => {
        this.pageActual();
      }, 
      error => {
        this.status = 'error';
        console.log('error');
      }
    );
  }
   

}
