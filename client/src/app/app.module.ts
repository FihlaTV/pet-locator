import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { FormsModule }    from '@angular/forms';
import { ReactiveFormsModule }    from '@angular/forms';

import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';

import {JsonpModule, Jsonp, Response} from '@angular/http';
import { PetsComponent } from './pets/pets.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { DetailsComponent } from './details/details.component';

import { CustomReuseStrategy } from './reuse-strategy';
import { RouteReuseStrategy } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    PetsComponent,
    FavoriteComponent,
    LoginComponent,
    PagenotfoundComponent,
    DetailsComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBebk9Y71UREa0DtUb9zxwjH4i9vaJDIEM",
      libraries: ["places"]
    }),
    BrowserModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    JsonpModule,
    AppRoutingModule
  ],
  providers: [
    HttpService,
    {provide: RouteReuseStrategy, useClass: CustomReuseStrategy}
    //CustomReuseStrategy
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
