import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../environments/environment';

@Injectable()
export class AjaxService {

  private url: string = environment.REST_HOST;
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  pullWeatherForecast(latitude: number, longitude: number): Promise<string[]> {
  	return this.http
  		.post(this.url+'/getWeatherForecast', JSON.stringify({latitude: latitude, longitude: longitude}), {headers: this.headers})
  		.toPromise()
  		.then(res => res.json())
  		.catch(this.handleError);
  }

  pullWeatherPastYear(latitude: number, longitude: number): Promise<string[]> {
    return this.http
      .post(this.url+'/getWeatherPastYear', JSON.stringify({latitude: latitude, longitude: longitude}), {headers: this.headers})
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
	  console.error('An error occurred', error); // for demo purposes only
	  return Promise.reject(error.message || error);
  }
}
