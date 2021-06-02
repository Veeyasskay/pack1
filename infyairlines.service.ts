import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Flight } from './shared/Flight';
import { FlightBooking } from './shared/FlightBooking';

@Injectable({
  providedIn: 'root'
})
export class InfyairlinesService {

  constructor(private http: HttpClient) { }

  getAllFlightsURL = "http://localhost:1050/flights/";
  getAllBookingsURL = "http://localhost:1050/bookings/";
  bookFlightURL = "http://localhost:1050/book/";
  updateBookingURL = "http://localhost:1050/update/";
  cancelBookingURL = "http://localhost:1050/cancel/";

  //req1-sol1
  getAllFlights(): Observable<Flight[]> {
    return this.http.get<Flight[]>(this.getAllFlightsURL);
  }

  bookFlight(flightId: String, formData: Object): Observable<Object> {
    return this.http.put<Object>(`${this.bookFlightURL}${flightId}`, formData);
  }

  getAllBookings(): Observable<FlightBooking[]> {
    return this.http.get<FlightBooking[]>(this.getAllBookingsURL);
  }

  updateBooking(formData: any): Observable<any> {
    return this.http.put<any>(`${this.updateBookingURL}${formData.bookingId}`, formData);
  }

  cancelBooking(bookingId: number): Observable<any> {
    return this.http.delete<any>(this.cancelBookingURL + bookingId);
  }
  
}
