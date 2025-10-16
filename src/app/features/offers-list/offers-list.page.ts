import { Component, inject, OnInit, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { OfferFacade } from '../../core/offer.facade';
import { OfferCardComponent } from '../../shared/ui/offer-card.component';
import { PageContainerComponent } from '../../shared/ui/page-container.component';

@Component({
  standalone: true,
  selector: 'app-offers-list-page',
  imports: [CommonModule, ReactiveFormsModule, OfferCardComponent, PageContainerComponent],
  template: `
    <app-page-container>
      <h2 class="text-2xl md:text-3xl font-semibold mb-4">Offers</h2>

      <div class="mb-4">
        <input
          type="search"
          class="w-full md:w-96 border rounded px-3 py-2"
          placeholder="Search by title..."
          [formControl]="searchControl"
        />
      </div>

      @if (filtered().length) {
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          @for (o of filtered(); track o.id) {
            <app-offer-card [offer]="o" (upvote)="upvote($event)" (downvote)="downvote($event)" />
          }
        </div>
      } @else {
        <p class="text-gray-600">No offers found.</p>
      }
    </app-page-container>
  `,
})
export class OffersListPage implements OnInit {
  private readonly facade = inject(OfferFacade);
  private readonly destroyRef = inject(DestroyRef);

  readonly query = this.facade.query.asReadonly();
  readonly filtered = this.facade.filteredByTitle;

  readonly searchControl = new FormControl<string>('', { nonNullable: true });

  ngOnInit(): void {
    this.searchControl.setValue(this.query(), { emitEvent: false });
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.facade.setQuery(value));
  }

  upvote(id: string): void {
    this.facade.upvote(id);
  }

  downvote(id: string): void {
    this.facade.downvote(id);
  }
}
