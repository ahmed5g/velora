import {Component, effect, inject, OnDestroy} from '@angular/core';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {LandlordListingService} from '../landlord-listing.service';
import {ToastService} from "../../layout/toast.service";
import {Step} from './step.model';
import {AuthService} from '../../core/auth/auth.service';
import {Router} from '@angular/router';
import {CreatedListing, Description, NewListing, NewListingInfo} from '../model/listing.model';
import {NewListingPicture} from '../model/picture';
import {State} from '../../core/model/state.model';
import {CategoryName} from '../../layout/navbar/category/category.model';
import {PriceVO} from '../model/listing-vo.model';
import {CategoryStepComponent} from './category-step/category-step.component';
import {DescriptionStepComponent} from './description-step/description-step.component';
import {InfoStepComponent} from './info-step/info-step.component';
import {LocationStepComponent} from './location-step/location-step.component';
import {PictureStepComponent} from './picture-step/picture-step.component';
import {PriceStepComponent} from './price-step/price-step.component';
import {FooterStepComponent} from '../../shared/footer-step/footer-step.component';

@Component({
  selector: 'app-properties-create',
  imports: [
    CategoryStepComponent,
    DescriptionStepComponent,
    InfoStepComponent,
    LocationStepComponent,
    PictureStepComponent,
    PriceStepComponent,
    FooterStepComponent
  ],
  templateUrl: './properties-create.component.html',
  standalone: true,
  styleUrl: './properties-create.component.scss'
})
export class PropertiesCreateComponent implements OnDestroy {

  CATEGORY = "category";
  LOCATION = "location";
  INFO = "info";
  PHOTOS = "photos";
  DESCRIPTION = "description";
  PRICE = "price";

  dialogDynamicRef = inject(DynamicDialogRef);
  listingService = inject(LandlordListingService);
  toastService = inject(ToastService);
  userService = inject(AuthService);
  router = inject(Router);

  steps: Step[] = [
    {
      id: this.CATEGORY,
      idNext: this.LOCATION,
      idPrevious: null,
      isValid: false
    },
    {
      id: this.LOCATION,
      idNext: this.INFO,
      idPrevious: this.CATEGORY,
      isValid: false
    },
    {
      id: this.INFO,
      idNext: this.PHOTOS,
      idPrevious: this.LOCATION,
      isValid: false
    },
    {
      id: this.PHOTOS,
      idNext: this.DESCRIPTION,
      idPrevious: this.INFO,
      isValid: false
    },
    {
      id: this.DESCRIPTION,
      idNext: this.PRICE,
      idPrevious: this.PHOTOS,
      isValid: false
    },
    {
      id: this.PRICE,
      idNext: null,
      idPrevious: this.DESCRIPTION,
      isValid: false
    }
  ];

  currentStep = this.steps[0];

  newListing: NewListing = {
    category: "AMAZING_VIEWS",
    infos: {
      guests: {value: 0},
      bedrooms: {value: 0},
      beds: {value: 0},
      baths: {value: 0}
    },
    location: "",
    pictures: new Array<NewListingPicture>(),
    description: {
      title: {value: ""},
      description: {value: ""}
    },
    price: {value: 0}
  };

  loadingCreation = false;


  constructor() {
    this.listenFetchUser();
    this.listenListingCreation();
  }

  createListing(): void {
    this.loadingCreation = true;
    this.listingService.create(this.newListing);
  }

  ngOnDestroy(): void {
    this.listingService.resetListingCreation();
  }

  listenFetchUser() {
    effect(() => {
      if (this.userService.fetchUser().status === "OK"
        && this.listingService.createSig().status === "OK") {
        this.router.navigate(["landlord", "properties"]);
      }
    });
  }

  listenListingCreation() {
    effect(() => {
      let createdListingState = this.listingService.createSig();
      if (createdListingState.status === "OK") {
        this.onCreateOk(createdListingState);
      } else if (createdListingState.status === "ERROR") {
        this.onCreateError();
      }
    });
  }

  onCreateOk(createdListingState: State<CreatedListing>) {
    this.loadingCreation = false;
    this.toastService.send({
      severity: "success", summary: "Success", detail: "Listing created successfully.",
    });
    this.dialogDynamicRef.close(createdListingState.value?.publicId);
    this.userService.fetch(true);
  }

  private onCreateError() {
    this.loadingCreation = false;
    this.toastService.send({
      severity: "error", summary: "Error", detail: "Couldn't create your listing, please try again.",
    });
  }

  nextStep(): void {
    if (this.currentStep.idNext !== null) {
      this.currentStep = this.steps.filter((step: Step) => step.id === this.currentStep.idNext)[0];
    }
  }

  previousStep(): void {
    if (this.currentStep.idPrevious !== null) {
      this.currentStep = this.steps.filter((step: Step) => step.id === this.currentStep.idPrevious)[0];
    }
  }

  isAllStepsValid(): boolean {
    return this.steps.filter(step => step.isValid).length === this.steps.length;
  }

  onCategoryChange(newCategory: CategoryName): void {
    this.newListing.category = newCategory;
  }

  onValidityChange(validity: boolean) {
    this.currentStep.isValid = validity;
  }

  onLocationChange(newLocation: string) {
    this.newListing.location = newLocation;
  }

  onInfoChange(newInfo: NewListingInfo) {
    this.newListing.infos = newInfo;
  }

  onPictureChange(newPictures: NewListingPicture[]) {
    this.newListing.pictures = newPictures;
  }

  onDescriptionChange(newDescription: Description) {
    this.newListing.description = newDescription;
  }

  onPriceChange(newPrice: PriceVO) {
    this.newListing.price = newPrice;
  }
}
