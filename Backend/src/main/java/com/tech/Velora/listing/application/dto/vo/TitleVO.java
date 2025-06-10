package com.tech.Velora.listing.application.dto.vo;

import jakarta.validation.constraints.NotNull;

public record TitleVO (@NotNull (message = "Title must not be null")String value){
}
