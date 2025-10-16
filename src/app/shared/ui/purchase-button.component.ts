import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-purchase-button',
  imports: [CommonModule],
  template: `
    <a
      class="px-3 py-1 rounded border text-blue-700 hover:underline cursor-pointer inline-block"
      [href]="href()"
      target="_blank"
      rel="noopener"
    >Purchase</a>
  `,
})
export class PurchaseButtonComponent {
  href = input.required<string>();
}
