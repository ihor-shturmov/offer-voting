import { Injectable, computed, signal, inject } from '@angular/core';
import type { Offer } from './offer.model';
import { MOCK_OFFERS } from './mock-offers';
import { LocalStorageService } from '../shared/local-storage.service';

@Injectable({ providedIn: 'root' })
export class OfferStore {
  readonly offers = signal<Offer[]>([]);
  readonly currentId = signal<string | null>(null);
  private readonly storage = inject(LocalStorageService);

  constructor() {
    const fromStorage = this.safeLoad();
    this.offers.set(fromStorage ?? MOCK_OFFERS);
  }

  readonly sortedByVotes = computed(() => {
    const current = this.offers();
    return [...current].sort((a, b) => b.votes - a.votes);
  });

  readonly currentOffer = computed<Offer | null>(() => {
    const id = this.currentId();
    if (!id) return null;
    return this.getById(id) ?? null;
  });

  readonly getById = (id: string): Offer | undefined => {
    return this.offers().find((o) => o.id === id);
  };

  upvote(id: string): void {
    this.updateVotes(id, +1);
  }

  downvote(id: string): void {
    this.updateVotes(id, -1);
  }

  setCurrentId(id: string | null): void {
    this.currentId.set(id);
  }

  private updateVotes(id: string, delta: number): void {
    this.offers.update((list) => {
      const next = list.map((o) => (o.id === id ? { ...o, votes: o.votes + delta } : o));
      this.persist(next);
      return next;
    });
  }

  private persist(list: Offer[]): void {
    this.storage.setJSON('offers', list);
  }

  private safeLoad(): Offer[] | null {
    const parsed = this.storage.getJSON<unknown>('offers');
    if (Array.isArray(parsed)) {
      return parsed.filter(
        (x: any) =>
          x &&
          typeof x.id === 'string' &&
          typeof x.title === 'string' &&
          typeof x.votes === 'number',
      ) as Offer[];
    }
    return null;
  }
}
