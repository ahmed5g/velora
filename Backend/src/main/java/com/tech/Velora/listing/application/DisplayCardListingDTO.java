package com.tech.Velora.listing.application;

import com.tech.Velora.listing.application.dto.sub.PictureDTO;
import com.tech.Velora.listing.application.dto.vo.PricesVO;
import com.tech.Velora.listing.domain.BookingCategory;

import java.util.UUID;

public record DisplayCardListingDTO(
        PricesVO price,
        String location,
        PictureDTO cover,
        BookingCategory bookingCategory,
        UUID publicId
) {
}
