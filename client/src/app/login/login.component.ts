import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  newUser: any;
  user: any;
  errors = [];

  constructor(
    private _route: ActivatedRoute,
    private _httpService: HttpService,
    private _router: Router
  ) { }

  ngOnInit() {
    this.newUser = {email: "", password: "", favorites: []}
    this.user = {email: "", password: "", favorites: []}
  }

  onLogin() {
    console.log("Trying to log in", this.user);

    let observable = this._httpService.login(this.user);
    observable.subscribe(data => {
      console.log("Got data from post back", data);
      if (data['message'] == "Error") {
        console.log("ERROR!!!");
        this.errors = data['errors']
        console.log("ERROR IS!!!", this.errors);
      }
      else {
        this.user.id = data.user._id;
        console.log("USER", this.user.id);
        //this.user = {email: "", password: "", favorites: []}
        //this._router.navigate(['/pets'], { queryParams: { id: this.user.id } });
        this._httpService.setUser(this.user.id);
        this._router.navigate(['/pets/'], { queryParams: {id: this.user.id} });
      }
      //this.getAuthors();
    })

  }
  onRegister() {
    console.log("Trying to create a new user", this.newUser);
    let observable = this._httpService.addUser(this.newUser);
    observable.subscribe(data => {
      console.log("Got data from post back", data);
      if (data['message'] == "Error") {
        console.log("ERROR!!!");
        this.errors = data['errors']
        console.log("ERROR IS!!!", this.errors);
      }
      else {
        this.newUser = {email: "", password: "", favorites: []}
        this._router.navigate(['/pets']);
      }
      //this.getAuthors();
    })

  }

}
