import { Component, computed, input, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { OfferFacade } from '../../core/offer.facade';
import { PageContainerComponent } from '../../shared/ui/page-container.component';
import { RoutesPaths } from '../../shared/routes';
import { UpvoteButtonComponent } from '../../shared/ui/upvote-button.component';
import { DownvoteButtonComponent } from '../../shared/ui/downvote-button.component';
import { OfferInfoComponent } from '../../shared/ui/offer-info.component';
import { PurchaseButtonComponent } from '../../shared/ui/purchase-button.component';

@Component({
  standalone: true,
  selector: 'app-offer-detail-page',
  imports: [
    CommonModule,
    NgOptimizedImage,
    RouterLink,
    PageContainerComponent,
    UpvoteButtonComponent,
    DownvoteButtonComponent,
  OfferInfoComponent,
  PurchaseButtonComponent,
  ],
  template: `
    <app-page-container>
      <a [routerLink]="routes.offersLink" class="text-blue-700 hover:underline">← Back to offers</a>

      @if (current()) {
        <div class="mt-4 grid gap-6 md:grid-cols-2">
          <img
            [ngSrc]="current()!.imageUrl"
            width="900"
            height="600"
            alt="{{ current()!.title }}"
            class="w-full h-auto object-cover rounded"
          />
          <div>
            <h1 class="text-2xl md:text-3xl font-semibold">{{ current()!.title }}</h1>
            <p class="mt-2 text-gray-700">{{ current()!.description }}</p>
            <app-offer-info [offer]="current()!" />

            <div class="mt-4 flex gap-2">
              <app-upvote-button (clicked)="upvote()" />
              <app-downvote-button (clicked)="downvote()" />
              <app-purchase-button [href]="current()!.purchaseUrl" />
            </div>
          </div>
        </div>
      } @else {
        <p class="mt-6 text-gray-600">Offer not found.</p>
      }
    </app-page-container>
  `,
})
export class OfferDetailPage {
  private readonly facade = inject(OfferFacade);
  protected readonly routes = RoutesPaths;

  readonly id = input.required<string>();

  readonly current = computed(() => this.facade.currentOffer());

  upvote(): void {
    const id = this.id();
    if (id) this.facade.upvote(id);
  }

  downvote(): void {
    const id = this.id();
    if (id) this.facade.downvote(id);
  }
}
