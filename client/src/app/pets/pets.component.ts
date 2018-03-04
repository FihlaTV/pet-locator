import { Component } from '@angular/core';
import { ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { HttpService } from '../http.service';

declare const google: any;
declare var map: any;

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.css']
})
export class PetsComponent implements OnInit {
  errors = '';
  title: string = 'My first AGM project';
  lat: number = 37.3999;
  lng: number = -122.108401;
  animal = '';
  breed = '';
  gender = '';
  size = '';
  age = '';
  pets = [];
  map: any;
  marker: any;
  user: any;
  currentUser: any;
  error: any;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {

    this.currentUser = this._httpService.getUser();
    console.log("CURRENT USER", this.currentUser);

    this.user = {id: "", email: "", password: "", favorites: []}
    this._route.params.subscribe((params: Params) => {
      console.log("Params", params)
      this.user.id = params['id'];
      console.log("Current user", this.user.id)

    })

    var mapProp = {
        center: new google.maps.LatLng(37.3998683, -122.1105936),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(document.getElementById('map'), mapProp);

  }

  onGetPets(){
    for (var i = 0; i < this.pets.length; i++) {
      console.log("Trying to remove marker", this.pets[i].marker)
      if (this.pets[i].marker) {

        this.pets[i].marker.setMap(null)
        this.pets[i].marker = null;
      }
    }
    //setMapOnAll(null);
    //this.marker =
    //this.map.clearOverlays();
    console.log("Gender", this.gender);
    let observable = this._httpService.getPets(this.animal, this.gender, this.size, this.age);
    observable.subscribe(data => {
      console.log("Got data from post back", data);
      if (data['message'] == "Error") {
         console.log("ERROR!!!");
         this.errors = data['errors']
        console.log("ERROR IS!!!", this.errors);
      }
      else {
        this.pets = data._body.petfinder.pets.pet
        console.log("Got data from post back", this.pets);
        this.displayPets();

      }
    })
  }

  displayPets() {
      //console.log("LLLL", this.marker.length);

      //while(this.marker.length) { console.log(this.marker[0]);
         //this.marker.pop().setMap(null);
        //}
      var self = this
      var pet = new google.maps.Geocoder();
      console.log(this.pets)
      for (var i = 0; i < this.pets.length; i++) {
       (function(i){
       setTimeout(function(){
         console.log(i)
      pet.geocode( { 'address': self.pets[i].contact.zip.$t}, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          self.pets[i].lat = results[0].geometry.location.lat();
          self.pets[i].lng = results[0].geometry.location.lng();
          console.log("***", self.pets[i].lat, self.pets[i].lng )
          self.pets[i].marker = new google.maps.Marker({
               position: {lat: self.pets[i].lat, lng: self.pets[i].lng},
               map: self.map,
               animation: google.maps.Animation.DROP,
               title: 'Hello World!'
             });
          self.pets[i].marker.setMap(self.map)

          console.log("Marker", self.pets[i].marker)
          // self.pets[i].marker.setAnimation(google.maps.Animation.BOUNCE);
          // setTimeout(function() {
          //     self.pets[i].marker.setAnimation(null);
          // }, 750);

         } });
    }, i * 700);
     })(i);
      }
  }

  onImgClick(pet) {
    //for (var i = 0; i < this.marker.length; i++) {
      console.log("Marker", pet.marker);
      pet.marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function() {
          pet.marker.setAnimation(null);
      }, 750);


  }
  onFavorite(name, breed, photo, description, city, email, lat, lng){
    var favoritePet = {name: name, breed: breed, photo: photo, description: description, city: city, email: email, lat: lat, lng: lng}
    console.log("FAVORITED", favoritePet, this.currentUser);
    let observable = this._httpService.favorite(favoritePet, this.currentUser);
    observable.subscribe(data => {
      console.log("Got data from post back", data);
      if (data['message'] == "Error") {
        console.log("ERROR!!!");
        this.error = data['error'].errors.name.message
        console.log("ERROR IS!!!", this.error);
      }
      else {
        console.log("Successfully favorited the pet", favoritePet);
      }
      //this.getAuthors();
    })

  }
}
