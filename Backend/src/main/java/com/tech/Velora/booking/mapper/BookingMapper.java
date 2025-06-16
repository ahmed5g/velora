package com.tech.Velora.booking.mapper;

import com.tech.Velora.booking.application.dto.BookedDateDTO;
import com.tech.Velora.booking.application.dto.NewBookingDTO;
import com.tech.Velora.booking.domain.Booking;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BookingMapper {
    Booking newBookingToBooking (NewBookingDTO newBookingDTO);


    BookedDateDTO bookingToCheckAvailability (Booking booking);
}
