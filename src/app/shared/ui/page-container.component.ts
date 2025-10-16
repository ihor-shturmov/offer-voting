import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-page-container',
  template: `
    <section class="container mx-auto p-4 md:p-6 lg:p-8">
      <ng-content />
    </section>
  `,
})
export class PageContainerComponent {}
