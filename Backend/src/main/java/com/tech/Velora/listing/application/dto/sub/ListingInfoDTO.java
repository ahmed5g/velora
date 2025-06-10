package com.tech.Velora.listing.application.dto.sub;

import com.tech.Velora.listing.application.dto.vo.GuestsVO;
import com.tech.Velora.listing.application.dto.vo.BathsVO;
import com.tech.Velora.listing.application.dto.vo.BedroomsVO;
import com.tech.Velora.listing.application.dto.vo.BedsVO;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

public record ListingInfoDTO(
        @NotNull @Valid GuestsVO guests,
        @NotNull @Valid BedroomsVO bedrooms,
        @NotNull @Valid BedsVO beds,
        @NotNull @Valid BathsVO baths
        ) {
}
