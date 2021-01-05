import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { PAGES_ROUTES } from './app.routing';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { VideoNewComponent } from './components/video-new/video-new.component';

import { IdentityGuard } from './services/identity.guard';
import { VideoEditComponent } from './components/video-edit/video-edit.component';
import { VideoDetailComponent } from './components/video-detail/video-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorComponent,
    RegisterComponent,
    LoginComponent,
    UserEditComponent,
    VideoNewComponent,
    VideoEditComponent,
    VideoDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PAGES_ROUTES,
    HttpClientModule,
    CommonModule
  ],
  providers: [
    IdentityGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
