import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {JsonpModule, Jsonp, Response} from '@angular/http';
import 'rxjs/add/operator/map'

@Injectable()
export class HttpService {
  api_key = '83b4cadb55250c42494e8d69302e36bd'
  constructor(
    private _http: HttpClient,
    private jsonp: Jsonp
    ) {
    //this.getPets();
  }

  //getPets(breed, size, gender, zipcode) {
  getPets(breed, gender, size) {
      // let pets = this._http.get("http://api.petfinder.com/breed.list?key=" + this.api_key + "&animal=dog&format=json");
      // pets.subscribe(data => {
      //   console.log("Got pets!", data);
      //   //console.log("Bulbasaur's abilities are",
      //           //  data.abilities[0].ability.name, "and", data.abilities[1].ability.name );
      //   //let pokemons = this._http.get(data.abilities[0].ability.url);
      //   //pokemons.subscribe(data => console.log(data.pokemon.length, `Pokemons have the chlorophyll ability`));
      //   return data;
      // });
//payload = {'breed': breed, 'age': age, 'size':size, 'sex':gender, 'location':zipcode, 'key': api_key, 'format': 'json'}

      // dogs = requests.get("http://api.petfinder.com/pet.find", params=payload)
      // return this.jsonp.request("http://api.petfinder.com/breed.list?key=" + this.api_key + "&animal=dog&format=json&callback=JSONP_CALLBACK")

      // return this.jsonp.request("http://api.petfinder.com/breed.list?key=" + this.api_key + "&animal=dog&format=json&callback=JSONP_CALLBACK")
      //     .map(res => {
      //       return res
      //     });

      return this.jsonp.request("http://api.petfinder.com/pet.find?key=" + this.api_key + "&location=94040&sex=" + gender + "&size=S&animal=dog&format=json&callback=JSONP_CALLBACK")
          .map(res => {
            return res
          });


      // this._http.jsonp("http://api.petfinder.com/breed.list?key=" + this.api_key + "&animal=dog&format=json&callback=JSONP_CALLBACK")
      //   .subscribe( res => {
      //         return res
      //      });



      // $.getJSON('http://api.petfinder.com/my.method?format=json&key=12345&callback=?')
      // .done(function(petApiData) { alert('Data retrieved!'; })
      // .error(function(err) { alert('Error retrieving data!');
      // });
      //return this._http.get('https://pokeapi.co/api/v2/pokemon/1/');
  }

}
