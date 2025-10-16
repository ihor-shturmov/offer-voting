import { Component, output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-downvote-button',
  template: `
    <button
      type="button"
      class="px-3 py-1 rounded bg-rose-600 text-white cursor-pointer"
      (click)="clicked.emit()"
    >
      Downvote
    </button>
  `,
})
export class DownvoteButtonComponent {
  clicked = output<void>();
}
