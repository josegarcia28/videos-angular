import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { userService } from '../../services/user.service';
import { Video } from '../../models/video';
import { User } from '../../models/user';
import { videoService } from '../../services/video.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.css']
})
export class VideoDetailComponent implements OnInit {
  public identity: User;
  public token: string;
  public video: Video;
  public status: string;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _userService: userService,
              private _videoService: videoService,
              private _sanitizer: DomSanitizer) {
    this.identity = this._userService.getIdentity(); 
    this.token = this._userService.getToken();

  }

  ngOnInit(): void {
    this.getVideo();
  }

  getVideo(){
    this._route.params.subscribe( params => {
      let id = +params['id'];

      this._videoService.getVideo(this.token, id).subscribe(
        resp => {
          if(resp.status == 'success'){
            this.video = resp.video;
          } else {
            this._router.navigate(['/inicio']);
            console.log('error al recibir respuesta');
          }
        },
        error => {
          this.status = 'error';
          console.log(error);
        }
      )
    });
  }

  getVideoIframe(url) {
    var video, results;
 
    if (url === null) {
        return '';
    }
    results = url.match('[\\?&]v=([^&#]*)');
    video   = (results === null) ? url : results[1];
 
    return this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + video);   
  }


}
