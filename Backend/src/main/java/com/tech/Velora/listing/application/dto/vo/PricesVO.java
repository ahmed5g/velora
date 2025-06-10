package com.tech.Velora.listing.application.dto.vo;

import jakarta.validation.constraints.NotNull;

public record PricesVO(@NotNull(message = "Prices must not be null")int value) {
}
