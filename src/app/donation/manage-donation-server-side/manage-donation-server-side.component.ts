import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { GithubService } from 'src/app/services/github.service';

import {
  merge,
  Observable,
  of as observableOf,
  pipe,
  // mergeMap,
  iif,
  interval,
} from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Donation } from 'src/app/model/donation.interface';

@Component({
  selector: 'app-manage-donation-server-side',
  templateUrl: './manage-donation-server-side.component.html',
  styleUrls: ['./manage-donation-server-side.component.css']
})
export class ManageDonationServerSideComponent implements OnInit {

  ngOnInit(): void { }

  displayedColumns = ['id', 'name', 'phone', 'donation_type', 'quantity'];

  data: Donation[] = [];

  pageSizes = [5, 10, 30, 50];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public githubService: GithubService) { }

  searchKeywordFilter = new FormControl();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    // this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngAfterViewInit() {

    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.searchKeywordFilter.valueChanges, this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          var filterValue = this.searchKeywordFilter.value == null ? '' : 'name:' + this.searchKeywordFilter.value;
          
          // console.debug('filtering ' + filterValue + '!');

          // GET /donations?page=0&size=10&filter=donorName:John,amount>100&sort=amount&order=desc

          return this.githubService
            .getRepoIssues(
              filterValue,
              this.sort.active,
              this.sort.direction,
              this.paginator.pageIndex,
              this.paginator.pageSize
            )
            .pipe(catchError(() => observableOf(null)));
        }),
        map((data) => {
          
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }

          // Only refresh the result length if there is new data. In case of rate
          // limit errors, we do not want to reset the paginator to zero, as that
          // would prevent users from re-triggering requests.
          this.resultsLength = data.totalElements;
          return data.content;
        })
      )
      .subscribe((data) => (this.data = data));
  }

}