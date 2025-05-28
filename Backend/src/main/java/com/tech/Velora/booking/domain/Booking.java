package com.tech.Velora.booking.domain;

import jakarta.persistence.*;
import org.hibernate.annotations.UuidGenerator;

import java.time.OffsetDateTime;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "booking")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "bookingSequenceGenerator")
    @SequenceGenerator(name = "bookingSequenceGenerator", sequenceName = "booking_generator", allocationSize = 1)
    @Column(name = "id")
    private Long id;

    @UuidGenerator
    @Column(name = "public_id", nullable = false)
    private UUID publicId;

    @Column(name = "start_date", nullable = false)
    private OffsetDateTime startDate;
    @Column(name = "end_date", nullable = false)
    private OffsetDateTime endDate;

    @Column(name = "totale_price", nullable = false)
    private int totalPrice;

    @Column(name = "nb_of_travelers", nullable = false)
    private int numberOfTravelers;

    @Column(name = "fk_listing", nullable = false)
    private UUID fkListing;

    public Long getId () {
        return id;
    }

    public void setId (Long id) {
        this.id = id;
    }

    public UUID getPublicId () {
        return publicId;
    }

    public void setPublicId (UUID publicId) {
        this.publicId = publicId;
    }

    public OffsetDateTime getStartDate () {
        return startDate;
    }

    public void setStartDate (OffsetDateTime startDate) {
        this.startDate = startDate;
    }

    public OffsetDateTime getEndDate () {
        return endDate;
    }

    public void setEndDate (OffsetDateTime endDate) {
        this.endDate = endDate;
    }

    public int getTotalPrice () {
        return totalPrice;
    }

    public void setTotalPrice (int totalPrice) {
        this.totalPrice = totalPrice;
    }

    public int getNumberOfTravelers () {
        return numberOfTravelers;
    }

    public void setNumberOfTravelers (int numberOfTravelers) {
        this.numberOfTravelers = numberOfTravelers;
    }

    public UUID getFkListing () {
        return fkListing;
    }

    public void setFkListing (UUID fkListing) {
        this.fkListing = fkListing;
    }

    @Override
    public boolean equals (Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Booking booking = (Booking) o;
        return totalPrice == booking.totalPrice && numberOfTravelers == booking.numberOfTravelers && Objects.equals(startDate, booking.startDate) && Objects.equals(endDate, booking.endDate) && Objects.equals(fkListing, booking.fkListing);
    }

    @Override
    public int hashCode () {
        return Objects.hash(startDate, endDate, totalPrice, numberOfTravelers, fkListing);
    }

    @Override
    public String toString () {
        return "Booking{" +
                "startDate=" + startDate +
                ", endDate=" + endDate +
                ", totalPrice=" + totalPrice +
                ", numberOfTravelers=" + numberOfTravelers +
                ", fkListing=" + fkListing +
                '}';
    }
}
