import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';

import { WeatherInfoComponent }     from './weather/weather-info/weather-info.component';
import { NotFoundComponent } from './not-found/not-found.component';
 
const appRoutes: Routes = [
  { path: 'weather-info', component: WeatherInfoComponent },
  { path: '',   redirectTo: '/', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];
 
@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}