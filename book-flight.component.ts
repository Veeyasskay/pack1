import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InfyairlinesService } from '../infyairlines.service';

@Component({
  selector: 'app-book-flight',
  templateUrl: './book-flight.component.html',
  styleUrls: ['./book-flight.component.css']
})
export class BookFlightComponent implements OnInit {

  successMessage = null;
  errorMessage = null;
  flightDetails: any;
  bookingForm: any;
  // bookingForm: FormGroup;

  constructor(private fb: FormBuilder, private ias: InfyairlinesService) { }

  ngOnInit(): void {
    this.bookingForm = this.fb.group({
      customerName: ["", [Validators.required, Validators.pattern(/^[A-z]+([ ][A-z]+)*$/)]],
      noOfTickets: ["", [Validators.required, Validators.min(1), Validators.max(6)]],
      customerId: ["", [Validators.required, this.validateCustomerId]]
    })
  }

  recieveFlightData(flight: any) {
    this.flightDetails = flight;
    this.bookingForm.reset();
    this.successMessage = this.errorMessage = null;
  }

  bookFlight() {
    this.successMessage = this.errorMessage = null;
    this.ias.bookFlight(this.flightDetails.flightId, this.bookingForm.value).subscribe(
      (response: any) => this.successMessage = response.message,
      (error: any) => this.errorMessage = error.error.message
    )
  }

  validateCustomerId(c: FormControl) {
    let CUSTOMERID_REGEX = /^[A-Z][1-9][0-9]{3}$/;
    if (c.value?.match(CUSTOMERID_REGEX)) {
      return null;
    } else {
      return { customerIdError: { message: "Enter a valid Customer Id (E.g., R1001)" } }
    }
  }

}
