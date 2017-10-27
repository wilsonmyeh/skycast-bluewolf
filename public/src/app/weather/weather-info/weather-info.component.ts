import { Component, OnInit } from '@angular/core';
import { Router, Routes, ActivatedRoute, ParamMap } from '@angular/router';

import { WeatherService } from 'app/weather/weather.service';
import * as moment from 'moment-timezone';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.css']
})
export class WeatherInfoComponent implements OnInit {

  public location: string;
  public weatherForecast: any;
  public weatherHistory: any;

  public humidity: number;
  public precipProbability: number;
  public summary: string;
  public uvIndex: number;
  public temperature: number;
  public visibility: number;

  public hourlyChartData: Array<any>;
  public hourlyChartLabels: Array<any>;

  public dailyChartData: Array<any>;
  public dailyChartLabels: Array<any>;

  public monthlyChartData: Array<any>;
  public monthlyChartLabels: Array<any>;

  public lineChartOptions:any = {
    responsive: false
  };

  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  constructor(
    private weatherService: WeatherService,
    private router: Router,
    private route: ActivatedRoute,
  ){}

  ngOnInit() {
  	if (!this.weatherService.getWeatherForecast()) {
  		this.router.navigate(['/dashboard']);
  	}
  	// Can do direct location links in the future maybe
  	this.route.paramMap
	    .switchMap((params: ParamMap) => this.weatherService.getLocation())
	    .subscribe( (loc) => {this.loadData()} );
  }

  private loadData() {
  	// Pull weather info from WeatherService when this component is routed toif(routeData.urlAfterRedirects === '/weatherinfo') {
    if (!this.weatherService.getWeatherForecast()) {
  		this.router.navigate(['/dashboard']);
  	} else {
  		this.location = this.weatherService.getLocation();
	  	this.weatherForecast = this.weatherService.getWeatherForecast();
	  	this.weatherHistory = this.weatherService.getWeatherHistory();
	  	this.loadCurrentWeather();
	  	this.loadHourlyChart();
	  	this.loadDailyChart();
	  	this.loadMonthlyChart();
  	}
  }

  private loadCurrentWeather() {
  	// currently data
    let curr: any = this.weatherForecast.currently;
    this.humidity = curr.humidity;
    this.precipProbability = curr.precipProbability;
    this.summary = curr.summary;
    this.temperature = curr.temperature;
    this.uvIndex = curr.uvIndex;
    this.visibility = curr.visibility;
  }

  private loadHourlyChart() {
    // initialize hourly for forecast
    this.hourlyChartData = [{data: [], label: 'Temperature'}];
    this.hourlyChartLabels = [];
    for (let i = 0; i < this.weatherForecast.hourly.data.length; ++i)
    {
      this.hourlyChartData[0].data.push(this.weatherForecast.hourly.data[i].temperature);
      this.hourlyChartLabels.push(moment.unix(this.weatherForecast.hourly.data[i].time).tz(this.weatherForecast.timezone).format('hh:mm'));
    }    
  }

  private loadDailyChart() {
  	// initialize 10-day for forecast
    this.dailyChartData = [
        {data: [], label: 'High'},
        {data: [], label: 'Low'}
    ];
    this.dailyChartLabels = [];
    for (let i = 0; i < this.weatherForecast.daily.data.length; ++i)
    {
      this.dailyChartData[0].data.push(this.weatherForecast.daily.data[i].temperatureHigh);
      this.dailyChartData[1].data.push(this.weatherForecast.daily.data[i].temperatureLow);
      this.dailyChartLabels.push(moment.unix(this.weatherForecast.daily.data[i].time).tz(this.weatherForecast.timezone).format('ddd, MM/DD'));
    }
  }

  private loadMonthlyChart() {
    // initialize past 12 months of historical weather
    this.monthlyChartData = [
        {data: [], label: 'High'},
        {data: [], label: 'Low'}
    ];
    this.monthlyChartLabels = [];
    for (let i = 0; i < this.weatherHistory.length; ++i)
    {
      this.monthlyChartData[0].data.push(this.weatherHistory[i].daily.data[0].temperatureHigh);
      this.monthlyChartData[1].data.push(this.weatherHistory[i].daily.data[0].temperatureLow);
      this.monthlyChartLabels.push(moment.unix(this.weatherHistory[i].currently.time).tz(this.weatherHistory[i].timezone).format('YYYY/MM/DD'));
    }
  }

}
