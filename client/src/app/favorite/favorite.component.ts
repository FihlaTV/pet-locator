import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  currentUser: any;
  favorites = [];
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getFavorites();



  }
  getFavorites(){
    this.currentUser = this._httpService.getUser();
    console.log("CURRENT USER", this.currentUser);
    console.log("Trying to retrieve favorite pets!")
    let observable = this._httpService.getCurrentUser(this.currentUser)
    observable.subscribe(data => {
      console.log("Got our data!", data)
      this.favorites = data.user.favorites;
      console.log("Got our favorites!", this.favorites)
    })
  }

}
