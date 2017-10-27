import { Injectable } from '@angular/core';
import { AjaxService } from 'app/ajax.service';
import { Router } from '@angular/router';

@Injectable()
export class WeatherService {

  private weatherForecast: any[];
  private weatherHistory: any[];
  private location: string;

  constructor(
  	private ajaxService: AjaxService,
    private router: Router,) { }

  pullWeatherForecast(latitude: number, longitude: number): Promise<string[]> {
  	return this.ajaxService.pullWeatherForecast(latitude, longitude).then((weatherData) => {
  		this.weatherForecast = weatherData;
  		return Promise.resolve(weatherData);
  	});
  }

  pullWeatherPastYear(latitude: number, longitude: number): Promise<string[]> {
  	return this.ajaxService.pullWeatherPastYear(latitude, longitude).then((weatherData) => {
  		let parsedData = [];
  		for (let i = 0; i < weatherData.length; ++i)
  		{
  			parsedData.push(JSON.parse(weatherData[i]));
  		}
  		this.weatherHistory = parsedData;
  		return Promise.resolve(parsedData);
  	});
  }

  setLocation(name: string): void {
  	this.location = name;
  }

  getLocation(): string {
  	return this.location;
  }

  getWeatherForecast(): any[] {
  	return this.weatherForecast;
  }

  getWeatherHistory(): any[] {
  	return this.weatherHistory;
  }
}
