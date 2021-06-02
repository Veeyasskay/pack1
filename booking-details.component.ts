import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void { }

  @Input() bookingsArray: Array<any> = [];

  @Output() bookingEmitter = new EventEmitter();

  openUpdateForm(bookingData: any) {
    this.router.navigate(['/update', bookingData.bookingId, bookingData.flightId]);
  }

  sendCancellationId(bookingId: number) {
    this.bookingEmitter.emit(bookingId);
  }



}
