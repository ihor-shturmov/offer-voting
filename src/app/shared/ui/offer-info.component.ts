import { Component, input } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import type { Offer } from '../../core/offer.model';

@Component({
  standalone: true,
  selector: 'app-offer-info',
  imports: [CommonModule, CurrencyPipe],
  template: `
    <div class="mt-2 text-sm text-gray-600 flex flex-wrap gap-x-4 gap-y-1">
      <span>{{ offer().price | currency: 'EUR' : 'symbol' : '1.0-2' }}</span>
      <span>Rating: {{ offer().rating }} ★</span>
      <span
        >Votes: <strong>{{ offer().votes }}</strong></span
      >
    </div>
  `,
})
export class OfferInfoComponent {
  offer = input.required<Offer>();
}
