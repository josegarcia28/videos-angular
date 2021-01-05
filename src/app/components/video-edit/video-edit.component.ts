import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { userService } from '../../services/user.service';
import { Video } from '../../models/video';
import { User } from '../../models/user';
import { videoService } from '../../services/video.service';

@Component({
  selector: 'app-video-edit',
  templateUrl: '../video-new/video-new.component.html',
  styleUrls: ['./video-edit.component.css']
})
export class VideoEditComponent implements OnInit {

  public page_title: string;
  public identity: User;
  public token: string;
  public video: Video;
  public status: string;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _userService: userService,
              private _videoService: videoService) {
    this.page_title = 'Editar Video';
    this.identity = this._userService.getIdentity(); 
    this.token = this._userService.getToken();

  }

  ngOnInit(): void {
    this.video = new Video(1,this.identity.id,'','','','',null,null);
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

  onSubmit(form){
    this._videoService.update(this.token, this.video, this.video.id).subscribe(
      resp => {
        if(resp.status == 'success'){
          this.status = 'success';
          this._router.navigate(['/inicio']);
        } else {
          this.status = 'error';
          console.log(resp);
        }
      },
      error => {
        this.status = 'error';
        console.log('error');
      }
    );
  }


}
