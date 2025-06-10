package com.tech.Velora.listing.application.dto.sub;

import com.tech.Velora.listing.application.dto.vo.TitleVO;
import com.tech.Velora.listing.application.dto.vo.DescriptionVO;
import jakarta.validation.constraints.NotNull;

public record DescriptionDTO (
        @NotNull TitleVO title,
        @NotNull DescriptionVO description
        ){
}
