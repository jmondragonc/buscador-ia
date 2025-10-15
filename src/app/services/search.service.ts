import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { SearchResult } from '../models/search.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private readonly apiUrl = environment.apiUrl;
  private readonly defaultK = 10;

  constructor(private http: HttpClient) {}

  search(query: string, k: number = this.defaultK): Observable<SearchResult[]> {
    if (!query || query.trim().length === 0) {
      return of([]);
    }

    const payload = {
      query: query.trim(),
      k: k
    };

    return this.http.post<SearchResult[]>(`${this.apiUrl}/search`, payload).pipe(
      catchError(error => {
        console.error('Error en búsqueda:', error);
        return of([]);
      })
    );
  }

  searchWithDebounce(query$: Observable<string>, k: number = this.defaultK): Observable<SearchResult[]> {
    return query$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => this.search(query, k))
    );
  }
}
