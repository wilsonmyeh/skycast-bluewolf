import { Injectable } from '@angular/core';
import { AjaxService } from 'app/ajax.service';

@Injectable()
export class WeatherService {

  constructor(private ajaxService: AjaxService) { }

  getWeatherForecast(latitude: number, longitude: number): Promise<string[]> {
  	return this.ajaxService.getWeatherForecast(latitude, longitude).then((weatherData) => {
  		return Promise.resolve(weatherData);
  	});
  }

  getWeatherPastYear(latitude: number, longitude: number): Promise<string[]> {
  	return this.ajaxService.getWeatherPastYear(latitude, longitude).then((weatherData) => {
  		var parsedData = [];
  		for (var i = 0; i < weatherData.length; ++i)
  		{
  			parsedData.push(JSON.parse(weatherData[i]));
  		}
  		return Promise.resolve(parsedData);
  	});
  }
}
