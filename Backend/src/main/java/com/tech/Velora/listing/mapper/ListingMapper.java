package com.tech.Velora.listing.mapper;

import org.mapstruct.Mapper;

@Mapper(componentModel = "spring", uses = {ListingMapper.class})
public interface ListingMapper {
}
