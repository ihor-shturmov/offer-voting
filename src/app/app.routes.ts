import { Routes } from '@angular/router';
import { offerResolver } from './core/offer.resolver';
import { RoutesPaths } from './shared/routes';

export const routes: Routes = [
  { path: RoutesPaths.root, redirectTo: RoutesPaths.offers, pathMatch: 'full' },
  {
    path: RoutesPaths.offers,
    title: 'Offers',
    loadComponent: () =>
      import('./features/offers-list/offers-list.page').then((m) => m.OffersListPage),
  },
  {
    path: RoutesPaths.offerDetail,
    title: 'Offer',
    loadComponent: () =>
      import('./features/offer-detail/offer-detail.page').then((m) => m.OfferDetailPage),
    resolve: { offer: offerResolver },
  },
  { path: '**', redirectTo: 'offers' },
];
