import { Component } from '@angular/core';

import { ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

import { HttpService } from './http.service';

declare const google: any;
declare var map: any;

@Component({
  selector: 'app-root',

  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
// export class AppComponent {
//   title = 'app';
// }

export class AppComponent {

  errors = '';
  title: string = 'My first AGM project';
  lat: number = 37.3999;
  lng: number = -122.108401;

  breed = '';
  gender = '';
  size = '';
  pets = [];
  map: any;
  marker = [];

  //google: any;


  constructor(private _httpService: HttpService){}

  ngOnInit() {}

    //   var map = new google.maps.Map(document.getElementById('map'), {
    //   center: {lat: 37.3998683, lng: -122.1105936},
    //   zoom: 13,
    //   //styles: styles,
    //   mapTypeControl: false
    // });

    // var mapProp = {
    //     center: new google.maps.LatLng(37.3998683, -122.1105936),
    //     zoom: 10,
    //     mapTypeId: google.maps.MapTypeId.ROADMAP
    // };
    // this.map = new google.maps.Map(document.getElementById('map'), mapProp);



//   onGetPets(){
//     //setMapOnAll(null);
//     //this.marker =
//     //this.map.clearOverlays();
//     console.log("Trying to get pets");
//     let observable = this._httpService.getPets(this.breed, this.gender, this.size);
//     observable.subscribe(data => {
//       console.log("Got data from post back", data);
//       if (data['message'] == "Error") {
//          console.log("ERROR!!!");
//          this.errors = data['errors']
//         console.log("ERROR IS!!!", this.errors);
//       }
//       else {
//         this.pets = data._body.petfinder.pets.pet
//         console.log("Got data from post back", this.pets);
//         this.displayPets();
//
//       }
//     })
//   }
//
//
// displayPets() {
//     console.log("LLLL", this.marker.length)
//     //while(this.marker.length) { console.log(this.marker[0]);
//        //this.marker.pop().setMap(null);
//       //}
//     var self = this
//     var pet = new google.maps.Geocoder();
//     console.log(this.pets)
//     for (var i = 0; i < this.pets.length; i++) {
//      (function(i){
//      setTimeout(function(){
//        console.log(i)
//     pet.geocode( { 'address': self.pets[i].contact.zip.$t}, function (results, status) {
//       if (status == google.maps.GeocoderStatus.OK) {
//         self.pets[i].lat = results[0].geometry.location.lat();
//         self.pets[i].lng = results[0].geometry.location.lng();
//         console.log("***", self.pets[i].lat, self.pets[i].lng )
//         self.marker[i] = new google.maps.Marker({
//              position: {lat: self.pets[i].lat, lng: self.pets[i].lng},
//              map: self.map,
//              animation: google.maps.Animation.DROP,
//              title: 'Hello World!'
//            });
//         self.marker[i].setMap(self.map)
//        } });
//   }, i * 500);
//    })(i);
//     }
// }




}
