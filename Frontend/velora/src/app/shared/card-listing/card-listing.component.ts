import {Component, effect, EventEmitter, inject, input, Output} from '@angular/core';
import {CardListing} from '../../landlord/model/listing.model';
import {Router} from '@angular/router';
import {CategoryService} from '../../layout/navbar/category/category.service';
import {CountryService} from '../../landlord/properties-create/location-step/country.service';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';

@Component({
    selector: 'app-card-listing',
  imports: [
    FaIconComponent
  ],
    templateUrl: './card-listing.component.html',
    standalone: true,
    styleUrl: './card-listing.component.scss'
})
export class CardListingComponent {


  listing= input.required<CardListing>();
  cardMode = input <"landlord" | "booking">();


  @Output()
  deleteListing = new EventEmitter<CardListing>();



  cardListing : CardListing | undefined;

  router = inject(Router);
  categoryService = inject(CategoryService);
  countryService = inject(CountryService);


  private listingToListing(){
    effect(() => {
      const listing = this.listing();
      this.countryService.getCountryByCode(listing.location)
        .subscribe({
          next: country =>{
            if (listing){
              this.listing().location = country.region + "," + country.name.common
            }
          }
        })
    });
  }

  onDeleteListing(displayCardListingDTO: CardListing){
    this.deleteListing.emit(displayCardListingDTO);
  }

  onClickCard(publicId: string){
    this.router.navigate(['listing'],
      {queryParams:{id: publicId}})
  }

}
