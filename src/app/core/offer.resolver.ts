import { inject } from '@angular/core';
import type { ResolveFn } from '@angular/router';
import type { Offer } from './offer.model';
import { OfferFacade } from './offer.facade';

export const offerResolver: ResolveFn<void> = (route) => {
  const facade = inject(OfferFacade);
  const id = route.paramMap.get('id');
  // Keep store selection in sync with the route before component instantiation
  // usually here we would have to call store to fetch data
  facade.setCurrentId(id);
};
