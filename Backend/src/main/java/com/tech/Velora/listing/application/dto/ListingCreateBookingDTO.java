package com.tech.Velora.listing.application.dto;

import com.tech.Velora.listing.application.dto.vo.PricesVO;

import java.util.UUID;

public record ListingCreateBookingDTO(
        UUID listingPublicId, PricesVO price
) {
}
