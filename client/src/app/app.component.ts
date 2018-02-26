import { Component } from '@angular/core';

import { ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'app-root',
  // styles: [`
  //   agm-map {
  //     height: 300px;
  //   }
  // `],
  // template: `
  //   <div class="container">
  //     <h1>Angular 2 + Google Maps Places Autocomplete</h1>
  //     <div class="form-group">
  //       <input placeholder="search for location" autocorrect="off" autocapitalize="off" spellcheck="off" type="text" class="form-control" #search [formControl]="searchControl">
  //     </div>
  //     <agm-map [latitude]="latitude" [longitude]="longitude" [scrollwheel]="false" [zoom]="zoom">
  //       <agm-marker [latitude]="latitude" [longitude]="longitude"></agm-marker>
  //     </agm-map>
  //   </div>
  // `,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// export class AppComponent {
//   title = 'app';
// }

export class AppComponent {


  title: string = 'My first AGM project';
  lat: number = 37.3999;
  lng: number = -122.108401;
  // public latitude: number;
  // public longitude: number;
  // public searchControl: FormControl;
  // public zoom: number;
  //
  // @ViewChild("search")
  // public searchElementRef: ElementRef;
  //
  // constructor(
  //   private mapsAPILoader: MapsAPILoader,
  //   private ngZone: NgZone
  // ) {}
  //
  // ngOnInit() {
  //   console.log("Trying to load a map")
  //   //set google maps defaults
  //   this.zoom = 4;
  //   this.latitude = 39.8282;
  //   this.longitude = -98.5795;
  //
  //   //create search FormControl
  //   this.searchControl = new FormControl();
  //
  //   console.log("Trying to set current position")
  //   //set current position
  //   this.setCurrentPosition();
  //
  //   console.log("Trying to load places")
  //   //load Places Autocomplete
  //   this.mapsAPILoader.load().then(() => {
  //     let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
  //       types: ["address"]
  //     });
  //     autocomplete.addListener("place_changed", () => {
  //       this.ngZone.run(() => {
  //         get the place result
  //         let place: google.maps.places.PlaceResult = autocomplete.getPlace();
  //
  //         //verify result
  //         if (place.geometry === undefined || place.geometry === null) {
  //           return;
  //         }
  //
  //         //set latitude, longitude and zoom
  //         this.latitude = place.geometry.location.lat();
  //         this.longitude = place.geometry.location.lng();
  //         this.zoom = 12;
  //       });
  //     });
  //   });
  // }
  //
  //
  // private setCurrentPosition() {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //       this.zoom = 12;
  //     });
  //   }
  // }
}
