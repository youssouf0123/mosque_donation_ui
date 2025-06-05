import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BehaviorSubject, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Donation } from 'src/app/model/donation.interface';
import { DataService } from 'src/app/services/data.service';

export class DonationDataSource extends DataSource<Donation> {

  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: Donation[] = [];
  renderedData: Donation[] = [];

  constructor(
    public _dataService: DataService,
    public _paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Donation[]> {

    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._dataService.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._dataService.getAllDonations();

    return merge(...displayDataChanges).pipe(map(() => {

        // Filter data
        this.filteredData = this._dataService.data.slice().filter((donation: Donation) => {
          const searchStr = (donation.id + donation.name + donation.phone + donation.donation_type).toLowerCase() + donation.quantity;
          return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
        });

        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());

        // Grab the page's slice of the filtered sorted data.
        const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
        this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
        return this.renderedData;
      }

    ));

  }

  disconnect() { }

  /** Returns a sorted copy of the database data. */
  sortData(data: Donation[]): Donation[] {

    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {

      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
        case 'phone': [propertyA, propertyB] = [a.phone, b.phone]; break;
        case 'donation_type': [propertyA, propertyB] = [a.donation_type, b.donation_type]; break;
        case 'quantity': [propertyA, propertyB] = [a.quantity, b.quantity]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });

  }

}