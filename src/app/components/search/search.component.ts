import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { SearchService } from '../../services/search.service';
import { SearchResult } from '../../models/search.model';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  searchQuery = '';
  searchSubject = new Subject<string>();
  results: SearchResult[] = [];
  isLoading = false;
  showResults = false;
  selectedIndex = -1;
  private subscription?: Subscription;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    // Configurar búsqueda con debounce
    this.subscription = this.searchService.searchWithDebounce(this.searchSubject, 10)
      .subscribe({
        next: (results) => {
          this.results = results;
          this.isLoading = false;
          this.showResults = results.length > 0;
          this.selectedIndex = -1;
        },
        error: (error) => {
          console.error('Error en búsqueda:', error);
          this.isLoading = false;
          this.results = [];
          this.showResults = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onSearchInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
    
    if (this.searchQuery.trim().length > 0) {
      this.isLoading = true;
      this.searchSubject.next(this.searchQuery);
    } else {
      this.results = [];
      this.showResults = false;
      this.isLoading = false;
    }
  }

  onKeyDown(event: KeyboardEvent): void {
    if (!this.showResults || this.results.length === 0) return;

    switch(event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.selectedIndex = Math.min(this.selectedIndex + 1, this.results.length - 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.selectedIndex = Math.max(this.selectedIndex - 1, -1);
        break;
      case 'Enter':
        event.preventDefault();
        if (this.selectedIndex >= 0) {
          this.selectResult(this.results[this.selectedIndex]);
        }
        break;
      case 'Escape':
        this.showResults = false;
        this.selectedIndex = -1;
        break;
    }
  }

  selectResult(result: SearchResult): void {
    this.searchQuery = result.name;
    this.showResults = false;
    this.selectedIndex = -1;
    console.log('Producto seleccionado:', result);
  }

  onFocus(): void {
    if (this.results.length > 0) {
      this.showResults = true;
    }
  }

  onBlur(): void {
    // Retrasar el cierre para permitir clicks en resultados
    setTimeout(() => {
      this.showResults = false;
      this.selectedIndex = -1;
    }, 200);
  }

  highlightMatch(text: string, query: string): string {
    if (!query || !text) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<strong>$1</strong>');
  }

  getScorePercentage(score: number): number {
    return Math.round(score * 100);
  }
}
