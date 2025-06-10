package com.tech.Velora.listing.application.dto.vo;

import jakarta.validation.constraints.NotNull;

public record BedroomsVO (@NotNull(message = "Bedrooms must not be null")int value){
}
