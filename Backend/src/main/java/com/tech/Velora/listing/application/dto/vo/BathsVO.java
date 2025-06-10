package com.tech.Velora.listing.application.dto.vo;

import jakarta.validation.constraints.NotNull;

public record BathsVO (@NotNull(message = "Baths must not be null")int value){
}
