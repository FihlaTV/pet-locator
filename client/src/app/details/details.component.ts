import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  pet = {name: '', breed: '', photo: '', description: '', city: '', email: '', lat: '', lng: ''};
  map: any;
  name = '';
  breed = '';
  description = '';
  city = '';
  email = '';
  lat: any;
  lng: any;
  marker: any;
  currentUser: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _httpService: HttpService
  ) { }

  ngOnInit() {
    this.currentUser = this._httpService.getUser();
    this._route.params.subscribe((params: Params) => {
      this.pet.name = params['name'];
      this.pet.breed = params['breed'];
      this.pet.photo = params['photo'];
      this.pet.description = params['description'];
      this.pet.city = params['city'];
      this.pet.email = params['email'];
      this.pet.lat = params['lat'];
      this.pet.lng = params['lng'];
      console.log("Pet Info", this.pet.email)

    })
    var mapProp = {
        center: new google.maps.LatLng(Number(this.pet.lat), Number(this.pet.lng)),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(document.getElementById('map'), mapProp);
    var marker = new google.maps.Marker({
         position: {lat: Number(this.pet.lat), lng: Number(this.pet.lng)},
         map: this.map,
         animation: google.maps.Animation.DROP,
         title: 'Hello World!'
       });
    marker.setMap(this.map)
    //this.getInfo();
  }
  getInfo(){

  }

}
