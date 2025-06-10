package com.tech.Velora.listing.application.dto.vo;

import jakarta.validation.constraints.NotNull;

public record BedsVO(@NotNull(message = "Beds must not be null")int value) {
}
