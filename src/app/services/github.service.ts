import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { SortDirection } from '@angular/material/sort';

import { environment } from '../../environments/environment';
import { Donation } from '../model/donation.interface';

@Injectable({
  providedIn: 'root',
})
export class GithubService {

  private apiServerUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getRepoIssues(
    filter: string,
    sort: string,
    order: SortDirection,
    page: number,
    perpage: number
  ): Observable<Donation> {
    
    // console.debug('sort column => ' + sort);

    const href = 'https://api.github.com/search/issues';
    const requestUrl = `${this.apiServerUrl}/donation?filter=${filter}&sort=${sort}&order=${order}&page=${page}&size=${perpage}`;
    // const requestUrl = `${this.apiServerUrl}/donation?page=${page}&size=${perpage}&filter=${filter}+in:title+repo:angular/components&sort=${sort}&order=${order}`;

    // console.debug(requestUrl);

    return this.http.get<Donation>(requestUrl);
  }

}