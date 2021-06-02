import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-booking-filters',
  templateUrl: './booking-filters.component.html',
  styleUrls: ['./booking-filters.component.css']
})
export class BookingFiltersComponent implements OnInit {

  flightId: string = "";
  customerId: string = "";

  constructor() { }

  @Output() filtersEmitter: EventEmitter<{ flightId: string, customerId: string }> = new EventEmitter();

  ngOnInit(): void {
  }

  sendFiltersData() {
    this.filtersEmitter.emit({ flightId: this.flightId, customerId: this.customerId });
  }

  resetFilters() {
    this.filtersEmitter.emit({ flightId: "", customerId: "" })
  }

}
