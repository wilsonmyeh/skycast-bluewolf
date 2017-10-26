import { Injectable } from '@angular/core';
import { AjaxService } from 'app/ajax.service';

@Injectable()
export class WeatherService {

  constructor(private ajaxService: AjaxService) { }

  getWeatherData(latitude: number, longitude: number): Promise<string[]> {
  	return this.ajaxService.getWeatherData(latitude, longitude).then((weatherData) => {
  		return Promise.resolve(weatherData);
  	});
  }
}
