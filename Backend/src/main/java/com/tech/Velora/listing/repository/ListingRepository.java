package com.tech.Velora.listing.repository;

import com.tech.Velora.listing.domain.Listing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


public interface ListingRepository extends JpaRepository<Listing, Long> {
}
