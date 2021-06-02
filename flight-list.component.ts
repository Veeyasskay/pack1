import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { InfyairlinesService } from '../infyairlines.service';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css']
})
export class FlightListComponent implements OnInit {

  constructor(private infyAirlinesServ: InfyairlinesService) { }

  flightsArray: any = [];
  errorMessage = "";

  ngOnInit(): void {
    this.getAllFlights();
  }

  @Output() flightEmitter = new EventEmitter();

  getAllFlights() {
    this.flightsArray = [];
    this.errorMessage = "";
    this.infyAirlinesServ.getAllFlights().subscribe(
      success => this.flightsArray = success,
      error => this.errorMessage = error.error.message
    )
  }

  sendFlightData(flight: any) {
    this.flightEmitter.emit(flight);
  }

}
