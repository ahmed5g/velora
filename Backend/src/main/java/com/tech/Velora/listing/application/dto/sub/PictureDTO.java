package com.tech.Velora.listing.application.dto.sub;

import jakarta.validation.constraints.NotNull;

import java.util.Objects;

public record PictureDTO(
        @NotNull byte[] file,
        @NotNull String filContentType,
        @NotNull boolean isCover
) {

    @Override
    public boolean equals (Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PictureDTO that = (PictureDTO) o;
        return isCover == that.isCover && Objects.equals(filContentType, that.filContentType);
    }

    @Override
    public int hashCode () {
        return Objects.hash(filContentType, isCover);
    }

    @Override
    public String toString () {
        return "PictureDTO{" +
                "filContentType='" + filContentType + '\'' +
                ", isCover=" + isCover +
                '}';
    }
}
