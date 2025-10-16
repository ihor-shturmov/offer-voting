import { Component, output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-upvote-button',
  template: `
    <button
      type="button"
      class="px-3 py-1 rounded bg-green-600 text-white cursor-pointer"
      (click)="clicked.emit()"
    >
      Upvote
    </button>
  `,
})
export class UpvoteButtonComponent {
  clicked = output<void>();
}
