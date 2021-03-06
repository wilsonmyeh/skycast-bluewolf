import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AgmCoreModule } from '@agm/core';
import { ChartsModule } from 'ng2-charts';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AjaxService } from './ajax.service';
import { WeatherService } from './weather/weather.service'

import { NavbarComponent } from './navbar/navbar.component';
import { WeatherInfoComponent }     from './weather/weather-info/weather-info.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    BrowserModule,
	  FormsModule,
    ReactiveFormsModule,
	  HttpModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.GOOGLE_MAPS_API_KEY,
      libraries: ["places"]
    }),
    ChartsModule,
  ],
  declarations: [
    AppComponent,
    NavbarComponent,
    WeatherInfoComponent,
    NotFoundComponent,
    DashboardComponent,
  ],
  providers: [ AjaxService, WeatherService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
