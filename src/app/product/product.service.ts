import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Product } from "./product.model";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  private productsUrl = "https://my-json-server.typicode.com/cristoaquiza/store-json-server/products";
  private _products$ = new BehaviorSubject<Product[]>([]);
  private store: { products: Product[] } = { products: [] };
  readonly products$ = this._products$.asObservable();

  constructor(private http: HttpClient) {}

  public getProducts(): void {
    this.http.get<Product[]>(this.productsUrl).subscribe((products: Product[]) => {
      this.store.products = products.map((product: Product) => {
        product.inventoryFromServer = product.inventory;
        return product;
      });
      this._products$.next(Object.assign({}, this.store).products);
    });
  }

  public checkInProduct(productCheckedIn: Product): void {
    this.store.products = this.store.products.map(product => {
      if (product.id === productCheckedIn.id) {
        product.inventory = product.inventory - 1;
      }
      return product;
    });
    this._products$.next(Object.assign({}, this.store).products);
  }

  public checkOutProduct(productCheckedOut: Product): void {
    this.store.products = this.store.products.map(product => {
      if (product.id === productCheckedOut.id) {
        product.inventory = product.inventory + 1;
      }
      return product;
    });
    this._products$.next(Object.assign({}, this.store).products);
  }
}
