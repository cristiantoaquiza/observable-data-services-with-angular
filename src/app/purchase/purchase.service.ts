import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Purchase } from "./purchase.model";
import { Product } from "../product/product.model";

@Injectable({
  providedIn: "root"
})
export class PurchaseService {
  private PURCHASE_URL = "https://my-json-server.typicode.com/cristoaquiza/store-json-server/purchases";
  private _purchases$ = new BehaviorSubject<Purchase[]>([]);
  private _cart$ = new BehaviorSubject<Purchase>({} as Purchase);
  private store: { cart: Purchase } = { cart: { date: Date.now().toString(), products: [], total: 0 } as Purchase };
  readonly purchases$ = this._purchases$.asObservable();
  readonly cart$ = this._cart$.asObservable();

  constructor(private http: HttpClient) {}

  public getPurchases(): void {
    this.http.get<Purchase[]>(this.PURCHASE_URL).subscribe((purchases: Purchase[]) => {
      this._purchases$.next(purchases);
    });
  }

  public addToCart(product: Product): void {
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
}
