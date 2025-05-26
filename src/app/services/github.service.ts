import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { SortDirection } from '@angular/material/sort';
import { GithubApi } from '../model/github-api.interface';

import { environment } from '../../environments/environment';

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
  ): Observable<GithubApi> {
    
    console.debug('sort column => ' + sort);

    const href = 'https://api.github.com/search/issues';
    const requestUrl = `${href}?q=${filter}+in:title+repo:angular/components&sort=${sort}&order=${order}&page=${page}&per_page=${perpage}`;

    // const href = 'https://api.github.com/search/issues';
    // const requestUrl = `${this.apiServerUrl}/donation?q=${filter}+in:title+repo:angular/components&sort=${sort}&order=${order}&page=${page}&size=${perpage}`;

    console.debug(requestUrl);

    return this.http.get<GithubApi>(requestUrl);
  }

  // public getDonations(): Observable<Donation[]> {
  //   return this.http.get<Donation[]>(`${this.apiServerUrl}/donation`);
  // }

}