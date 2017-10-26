// Google Maps Autocomplete Credits: http://brianflove.com/2016/10/18/angular-2-google-maps-places-autocomplete/

import { ElementRef, NgZone, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { } from '@types/googlemaps';
import { MapsAPILoader } from '@agm/core';
import { WeatherService } from 'app/weather/weather.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public searchHistory: string[];

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private weatherService: WeatherService,
  ) {}

  ngOnInit() {
    //create search FormControl
    this.searchControl = new FormControl();

    //load search history
    this.searchHistory = [];
    let historyJson: string = localStorage.getItem("searchHistory");
    if (historyJson !== null) {
      this.searchHistory = JSON.parse(historyJson);
    }

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {});
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          this.processPlace(place);
        });
      });
    });
  }

  // Requires https
  private setCurrentPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
      });
    }
  }

  // Text search the saved search to get the place result
  private recentSearch(location) {
    let placesService = new google.maps.places.PlacesService(document.getElementById('places-attributions') as HTMLDivElement);
    placesService.textSearch({"query": location}, (places) => {
      let place: google.maps.places.PlaceResult = places[0];
      this.processPlace(place);
    });
  }

  // TODO: refactor into WeatherService?
  // display weather data of the geographical coordinates, save as recently searched
  private processPlace(place) {
    //verify result
    if (place.geometry === undefined || place.geometry === null) {
      return;
    }
    //set latitude, longitude
    this.latitude = place.geometry.location.lat();
    this.longitude = place.geometry.location.lng();

    if (this.searchHistory.indexOf(place.formatted_address) === -1) {
      this.searchHistory.push(place.formatted_address);
      localStorage.setItem("searchHistory", JSON.stringify(this.searchHistory));
    }

    this.weatherService.getWeatherForecast(this.latitude, this.longitude).then(data => {console.log(data)});
    this.weatherService.getWeatherPastYear(this.latitude, this.longitude).then(data => {console.log(data)});
  }

}
