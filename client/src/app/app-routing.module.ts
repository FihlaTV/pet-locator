import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PetsComponent } from './pets/pets.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { LoginComponent } from './login/login.component';
import { DetailsComponent } from './details/details.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: 'pets',component: PetsComponent },
  { path: 'favorite',component: FavoriteComponent },
  { path: 'login',component: LoginComponent },
  { path: 'details/:name/:breed/:photo/:description/:city/:email/:lat/:lng',component: DetailsComponent },
  { path: '', pathMatch: 'full', redirectTo: '/pets' },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
