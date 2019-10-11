import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Purchase } from "./purchase.model";
import { Product } from "../product/product.model";

@Injectable({
  providedIn: "root"
})
export class PurchaseService {
  private purchaseUrl = "https://my-json-server.typicode.com/cristoaquiza/observable-data-services-with-angular/purchases";
  private _purchases$ = new BehaviorSubject<Purchase[]>([]);
  private _cart$ = new BehaviorSubject<Purchase>({} as Purchase);
  private store: { cart: Purchase; purchases: Purchase[] } = { cart: {} as Purchase, purchases: [] };
  readonly purchases$ = this._purchases$.asObservable();
  readonly cart$ = this._cart$.asObservable();

  constructor(private http: HttpClient) {}

  public getPurchases(): void {
    this.http.get<Purchase[]>(this.purchaseUrl).subscribe((purchases: Purchase[]) => {
      this.store.purchases = purchases;
      this._purchases$.next(Object.assign({}, this.store).purchases);
    });
  }

  public addToCart(product: Product): void {
    if (Object.entries(this.store.cart).length === 0) {
      this.store.cart = { date: Date.now(), products: [], total: 0 } as Purchase;
    }
    this.store.cart.products.push(product);
    this.store.cart.total += product.price;
    this._cart$.next(Object.assign({}, this.store).cart);
  }

  public removeFromCart(product: Product): void {
    const productRemovedIndex = this.store.cart.products.findIndex((element: Product) => element.id === product.id);
    this.store.cart.products.splice(productRemovedIndex, 1);
    this.store.cart.total -= product.price;
    this._cart$.next(Object.assign({}, this.store).cart);
  }

  public submitCart(): void {
    this.http.post(this.purchaseUrl, this.store.cart).subscribe(() => {
      this.store.purchases.push(this.store.cart);
      this._purchases$.next(Object.assign({}, this.store).purchases);
      this.store.cart = {} as Purchase;
      this._cart$.next(Object.assign({}, this.store).cart);
    });
  }
}
