package com.tech.Velora.listing.application;

import com.tech.Velora.listing.application.dto.CreatedListingDTO;
import com.tech.Velora.listing.application.dto.PictureService;
import com.tech.Velora.listing.application.dto.SaveListingDTO;
import com.tech.Velora.listing.domain.Listing;
import com.tech.Velora.listing.mapper.ListingMapper;
import com.tech.Velora.listing.repository.ListingRepository;
import com.tech.Velora.sharedkernel.doamin.service.State;
import com.tech.Velora.user.application.dto.Auth0Service;
import com.tech.Velora.user.application.dto.ReadUserDTO;
import com.tech.Velora.user.application.dto.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;


@Service
public class LandlordService {

    private final ListingRepository listingRepository;

    private final ListingMapper listingMapper;
    private final UserService userService;
    private final Auth0Service auth0Service;
    private final PictureService pictureService;

    public LandlordService(ListingRepository listingRepository, ListingMapper listingMapper, UserService userService, Auth0Service auth0Service, PictureService pictureService) {
        this.listingRepository = listingRepository;
        this.listingMapper = listingMapper;
        this.userService = userService;
        this.auth0Service = auth0Service;
        this.pictureService = pictureService;
    }

    public CreatedListingDTO create(SaveListingDTO saveListingDTO) {
        Listing newListing = listingMapper.saveListingDTOToListing(saveListingDTO);

        ReadUserDTO userConnected = userService.getAuthenticatedUserFromSecurityContext();
        newListing.setLandlordPublicId(userConnected.publicId());

        Listing savedListing = listingRepository.saveAndFlush(newListing);

        pictureService.saveAll(saveListingDTO.getPictures(), savedListing);

        auth0Service.addLandlordRoleToUser(userConnected);

        return listingMapper.listingToCreatedListingDTO(savedListing);
    }

    @Transactional(readOnly = true)
    public List<DisplayCardListingDTO> getAllProperties(ReadUserDTO landlord) {
        List<Listing> properties = listingRepository.findAllByLandlordPublicIdFetchCoverPicture(landlord.publicId());
        return listingMapper.listingToDisplayCardListingDTOs(properties);
    }

    @Transactional
    public State<UUID, String> delete(UUID publicId, ReadUserDTO landlord) {
        long deletedSuccessfuly = listingRepository.deleteByPublicIdAndLandlordPublicId(publicId, landlord.publicId());
        if (deletedSuccessfuly > 0) {
            return State.<UUID, String>builder().forSuccess(publicId);
        } else {
            return State.<UUID, String>builder().forUnauthorized("User not authorized to delete this listing");
        }
    }


}