package com.tech.Velora.listing.application.dto.vo;

import jakarta.validation.constraints.NotNull;

public record DescriptionVO (@NotNull(message = "Description must not be null")String value){
}
