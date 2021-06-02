import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InfyairlinesService } from '../infyairlines.service';

@Component({
  selector: 'app-update-booking',
  templateUrl: './update-booking.component.html',
  styleUrls: ['./update-booking.component.css']
})
export class UpdateBookingComponent implements OnInit {

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private ias: InfyairlinesService) {
  }
  bookingId: number = 0;
  flightId: string = "";
  successMessage: string = "";
  errorMessage: string = "";
  updateBookingForm: any;
  // updateBookingForm: FormGroup;

  ngOnInit() {
    this.route.params.subscribe(param => {
      this.bookingId = param.bookingId;
      this.flightId = param.flightId
    })
    this.updateBookingForm = this.fb.group({
      bookingId: [{ value: this.bookingId, disabled: true }, [Validators.required, Validators.min(2001)]],
      noOfTickets: ["", [Validators.required, Validators.min(1)]],
      flightId: [{ value: this.flightId, disabled: true }, [Validators.required]]
    })
  }

  updateBooking() {
    this.successMessage = this.errorMessage = "";
    let formObj = { bookingId: this.bookingId, noOfTickets: this.updateBookingForm.value.noOfTickets }
    this.ias.updateBooking(formObj).subscribe(
      (response: any) => this.successMessage = response.message,
      (err: any) => this.errorMessage = err.error.message
    )
  }
}

