import { Component } from '@angular/core';
import { SearchComponent } from './components/search/search.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SearchComponent],
  template: `<app-search></app-search>`,
  styles: []
})
export class AppComponent {
  title = 'search';
}
