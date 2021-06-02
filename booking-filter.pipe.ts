import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bookingFilter'
})
export class BookingFilterPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    try {
      if (args && args.length) {
        if (args[0] && args[1]) {
          return value.filter((booking: any) => booking.customerId == args[0] && booking.flightId == args[1]);
        } else if (args[0] && !args[1]) {
          return value.filter((booking: any) => booking.customerId == args[0]);
        } else if (!args[0] && args[1]) {
          return value.filter((booking: any) => booking.flightId == args[1]);
        } else {
          return value;
        }
      } else {
        return value;
      }
    } catch (err) {
      return value;
    }
  }

}
