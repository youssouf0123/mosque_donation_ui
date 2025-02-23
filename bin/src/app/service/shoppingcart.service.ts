import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  public items = {};
  public numberOfItems = 0;
  public totalprice = 0;

  constructor() { }

  public getCount(): number {
    return this.numberOfItems;
  }

  public addItem(item: any): void {
    if (this.items[item.upcCode] == null) {
      this.items[item.upcCode] = [];
    }
    this.items[item.upcCode].push(item);
    this.numberOfItems++;
  }

  public deleteItem(upcCode: string): void {
    if (this.items[upcCode] != null) {
      if (this.items[upcCode].length > 0) {
        this.items[upcCode].splice(0, 1);
        this.numberOfItems--;
      }
    }
  }

  public getItems(): any {
    return this.items;
  }

  public getTotalAmount(): number {
    this.totalprice = 0;
    for (let key in this.items) {
      for (let keyitem in this.items[key]) {
        this.totalprice += this.items[key][keyitem].price;
      }
    }
    return this.totalprice;
  }
}