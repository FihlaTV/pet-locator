import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {JsonpModule, Jsonp, Response} from '@angular/http';
import 'rxjs/add/operator/map'

// export class ShintoService {
//   balance: {value: number, number: number};
//
//   transactions = [];
//   random_num = 0;
//
//   //this.balance = {value: 1, number: 0};
//
//   constructor() {
//     this.balance = {value: 1, number: 0};
//   }



@Injectable()
export class HttpService {
  userid = '';
  errors = [];
  api_key = '83b4cadb55250c42494e8d69302e36bd'
  constructor(
    private _http: HttpClient,
    private jsonp: Jsonp,
    //this.userid = ''
    ) {
    //this.getPets();
  }

  //getPets(breed, size, gender, zipcode) {
  getPets(animal, gender, size, age) {


      return this.jsonp.request("http://api.petfinder.com/pet.find?key=" + this.api_key + "&location=94040&animal=" + animal + "&sex=" + gender + "&age=" + age + "&size=" + size + "&format=json&callback=JSONP_CALLBACK")
          .map(res => {
            return res
          });



  }
  addUser(newuser){
    console.log("sending request to backend to add new user", newuser)
    return this._http.post('/register', newuser);
  }
  login(user){
    console.log("sending request to log in", user)
    return this._http.post('/log-in', user);
  }

  setUser(userid){
    this.userid = userid;
    console.log("Current user", this.userid);
  }
  getUser(){
    return this.userid;

  }
  favorite(pet, currentUser){
    console.log("Sending request to favorite pet", pet);
    return this._http.put('/favorite/'+currentUser, pet);
  }
  getCurrentUser(currentUser_id){
    console.log("Sending request to get a current user", currentUser_id);
    return this._http.get('/user/'+currentUser_id);
  }
}
