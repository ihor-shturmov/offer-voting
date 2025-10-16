import { Injectable, computed, signal, inject } from '@angular/core';
import type { Offer } from './offer.model';
import { OfferStore } from './offer.store';

@Injectable({ providedIn: 'root' })
export class OfferFacade {
  private readonly store = inject(OfferStore);

  get offers() {
    return this.store.offers.asReadonly();
  }

  get sortedByVotes() {
    return this.store.sortedByVotes;
  }

  get currentId() {
    return this.store.currentId.asReadonly();
  }

  get currentOffer() {
    return this.store.currentOffer;
  }

  setCurrentId(id: string | null) {
    this.store.setCurrentId(id);
  }

  readonly query = signal<string>('');

  readonly filteredByTitle = computed(() => {
    const q = this.query().trim().toLowerCase();
    const items = this.sortedByVotes();
    if (!q) return items;
    return items.filter((o) => o.title.toLowerCase().includes(q));
  });

  setQuery(value: string) {
    this.query.set(value);
  }

  upvote(id: string): void {
    this.store.upvote(id);
  }

  downvote(id: string): void {
    this.store.downvote(id);
  }

  getById = (id: string): Offer | undefined => this.store.getById(id);
}
