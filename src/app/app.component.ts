import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pioveoggiarapallo.it';

  private weatherData: any;
  private lat: string = "44.36";
  private lon: string = "9.219999";

  private rainingConditions: Array<Number> = [
      51, 53, 55,	//Drizzle: Light, moderate, and dense intensity
      56, 57,	//Freezing Drizzle: Light and dense intensity
      61, 63, //65	Rain: Slight, moderate and heavy intensity
      66, 67,	//Freezing Rain: Light and heavy intensity
      71, 73, 75,	//Snow fall: Slight, moderate, and heavy intensity
      77,	//Snow grains
      80, 81, 82,	//Rain showers: Slight, moderate, and violent
      85, 86,	//Snow showers slight and heavy
      95, 	//Thunderstorm: Slight or moderate
      96, 99, //	Thunderstorm with slight and heavy hail
  ];

  constructor(private http: HttpClient) { }

  ngOnInit() {   
    let date = new Date().toISOString().split('T')[0]
    this.http.get<any>(`https://api.open-meteo.com/v1/forecast?latitude=${ this.lat }&longitude=${ this.lon }&daily=weathercode&current_weather=true&timezone=Europe%2FBerlin&start_date=${ date }&end_date=${ date }`)
              .subscribe(data => {
                  this.weatherData = data;
    });
}
  private isRaining(){
    return this.rainingConditions.includes(this.weatherData.daily.weathercode[0]);
  }

  public getClass(){
    return this.isRaining()? 
    'raining'
    :
    'not-raining';
  }

  public getLabel(){
    return this.isRaining()? "Si": "No"
  }
}
