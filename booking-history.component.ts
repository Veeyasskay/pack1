import { Component, OnInit } from '@angular/core';
import { InfyairlinesService } from '../infyairlines.service';
import { FlightBooking } from '../shared/FlightBooking';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent implements OnInit {

  bookingsArray: FlightBooking[] = [];
  errorMessage = null;
  customerId: string = "";
  flightId: string = "";
  successMessage = null;

  constructor(private ias: InfyairlinesService) { }

  ngOnInit(): void {
    this.getAllBookings();
  }

  getAllBookings() {
    this.ias.getAllBookings().subscribe(
      response => {
        console.log(response);
        response.forEach((bookingData: any) => {
          bookingData.bookings.forEach((booking: any) => {
            booking.flightId = bookingData.flightId;
            this.bookingsArray.push(booking)
          })
        })
        this.bookingsArray.sort((a, b) => (a.bookingId > b.bookingId) ? 1 : ((b.bookingId > a.bookingId) ? -1 : 0));
      },
      error => this.errorMessage = error.error.message
    )
  }


  receiveFiltersData(filtersObj: any) {
    this.customerId = filtersObj.customerId;
    this.flightId = filtersObj.flightId;
  }

  cancelBooking(bookingId: any) {
    this.successMessage = this.errorMessage = null;
    this.ias.cancelBooking(bookingId).subscribe(
      response => {
        this.successMessage = response.message;
        this.bookingsArray = this.bookingsArray.filter((data) => data.bookingId != bookingId)
        setTimeout(() => {
          this.successMessage = null;
        }, 4000);
      },
      error => {
        this.errorMessage = error.error.message;
        setTimeout(() => {
          this.errorMessage = null;
        }, 4000);
      }
    )
  }
  
}
