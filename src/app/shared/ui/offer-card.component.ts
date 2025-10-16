import { Component, input, output } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import type { Offer } from '../../core/offer.model';
import { RoutesPaths } from '../routes';
import { UpvoteButtonComponent } from './upvote-button.component';
import { DownvoteButtonComponent } from './downvote-button.component';
import { OfferInfoComponent } from './offer-info.component';

@Component({
  standalone: true,
  selector: 'app-offer-card',
  imports: [
    CommonModule,
    RouterLink,
    NgOptimizedImage,
    UpvoteButtonComponent,
    DownvoteButtonComponent,
    OfferInfoComponent,
  ],
  template: `
    <article class="rounded border transition hover:shadow p-3 flex flex-col">
      <a [routerLink]="RoutesPaths.offerById(offer().id)" class="block">
        <img
          [ngSrc]="offer().imageUrl"
          width="600"
          height="400"
          alt="{{ offer().title }}"
          class="w-full h-48 object-cover rounded"
        />
        <h3 class="mt-3 text-lg font-medium">{{ offer().title }}</h3>
      </a>

      <app-offer-info [offer]="offer()" />

      <div class="mt-3 flex gap-2">
        <app-upvote-button (clicked)="upvote.emit(offer().id)" />
        <app-downvote-button (clicked)="downvote.emit(offer().id)" />
      </div>
    </article>
  `,
})
export class OfferCardComponent {
  offer = input.required<Offer>();

  upvote = output<string>();
  downvote = output<string>();
  protected readonly RoutesPaths = RoutesPaths;
}
