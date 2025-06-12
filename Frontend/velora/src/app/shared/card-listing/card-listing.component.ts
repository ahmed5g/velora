import {
  Component,
  effect,
  EventEmitter,
  inject,
  input,
  Output,
  Signal
} from '@angular/core';
import {CardListing} from '../../landlord/model/listing.model';
import {BookedListing} from '../../tenant/model/booking.model';
import {Router} from '@angular/router';
import {CategoryService} from '../../layout/navbar/category/category.service';
import {CountryService} from '../../landlord/properties-create/location-step/country.service';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {CurrencyPipe, DatePipe} from '@angular/common';

@Component({
  selector: 'app-card-listing',
  standalone: true,
  templateUrl: './card-listing.component.html',
  styleUrl: './card-listing.component.scss',
  imports: [
    FaIconComponent,
    CurrencyPipe,
    DatePipe
  ]
})
export class CardListingComponent {
  listing = input.required<CardListing | BookedListing>();
  cardMode = input<"landlord" | "booking">();

  @Output() deleteListing = new EventEmitter<CardListing>();
  @Output() cancelBooking = new EventEmitter<BookedListing>();

  bookingListing?: BookedListing;
  cardListing?: CardListing;

  router = inject(Router);
  categoryService = inject(CategoryService);
  countryService = inject(CountryService);

  constructor() {
    this.listenToCardMode();
    this.enrichLocationWithCountry();

    effect(() => {
      console.log('listing data:', this.listing());
      console.log('cardMode:', this.cardMode());
      console.log('Card listing prices:', this.cardListing?.price);


      if (this.cardMode() === 'booking') {
        console.log('Booking dates:', this.bookingListing?.dates);
        console.log('Booking price:', this.bookingListing?.totalPrice);
      } else {
        console.log('Card listing category:', this.cardListing?.bookingCategory);
        console.log('Card listing price:', this.cardListing?.price);
      }
    });
  }

  private listenToCardMode() {
    effect(() => {
      const listing = this.listing();
      const mode = this.cardMode();

      if (mode === 'booking') {
        this.bookingListing = listing as BookedListing;
      } else {
        this.cardListing = listing as CardListing;
      }
    });
  }

  private enrichLocationWithCountry() {
    effect(() => {
      const rawListing = this.listing();
      const locationCode = rawListing.location;

      this.countryService.getCountryByCode(locationCode).subscribe({
        next: country => {
          if (this.cardMode() === 'booking') {
            (this.listing() as BookedListing).location = `${country.region}, ${country.name.common}`;
          } else {
            (this.listing() as CardListing).location = `${country.region}, ${country.name.common}`;
          }
        }
      });
    });
  }

  onClickCard(publicId: string) {
    this.router.navigate(['listing'], { queryParams: { id: publicId } });
  }

  onDeleteListing(listing: CardListing) {
    this.deleteListing.emit(listing);
  }

  onCancelBooking(booking: BookedListing) {
    this.cancelBooking.emit(booking);
  }
}
