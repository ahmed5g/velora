package com.tech.Velora.listing.application.dto;

import com.tech.Velora.listing.application.dto.sub.DescriptionDTO;
import com.tech.Velora.listing.application.dto.sub.ListingInfoDTO;
import com.tech.Velora.listing.application.dto.sub.PictureDTO;
import com.tech.Velora.listing.application.dto.vo.PricesVO;
import com.tech.Velora.listing.domain.BookingCategory;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public class SaveListingDTO {

    @NotNull BookingCategory category;
    @NotNull
    String location ;
    @NotNull @Valid ListingInfoDTO infos;
    @NotNull @Valid DescriptionDTO description;
    @NotNull @Valid PricesVO price;
    @NotNull List<PictureDTO> pictures;

    public BookingCategory getCategory () {
        return category;
    }

    public void setCategory (BookingCategory category) {
        this.category = category;
    }

    public String getLocation () {
        return location;
    }

    public void setLocation (String location) {
        this.location = location;
    }

    public ListingInfoDTO getInfos () {
        return infos;
    }

    public void setInfos (ListingInfoDTO infos) {
        this.infos = infos;
    }

    public DescriptionDTO getDescription () {
        return description;
    }

    public void setDescription (DescriptionDTO description) {
        this.description = description;
    }

    public PricesVO getPrice () {
        return price;
    }

    public void setPrice (PricesVO price) {
        this.price = price;
    }

    public List<PictureDTO> getPictures () {
        return pictures;
    }

    public void setPictures (List<PictureDTO> pictures) {
        this.pictures = pictures;
    }
}
