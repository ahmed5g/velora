package com.tech.Velora.listing.mapper;

import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {ListingPictureMapper.class})
public interface ListingPictureMapper {
}
