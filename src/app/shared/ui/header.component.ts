import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RoutesPaths } from '../routes';

@Component({
  standalone: true,
  selector: 'app-header',
  imports: [RouterLink],
  template: `
    <header class="bg-white/70 backdrop-blur border-b">
      <div class="container mx-auto p-4">
        <a [routerLink]="['/', RoutesPaths.offers]" class="text-xl font-semibold tracking-tight"
          >Rebuy Market</a
        >
      </div>
    </header>
  `,
})
export class HeaderComponent {
  protected readonly RoutesPaths = RoutesPaths;
}
