import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Purchase } from "./purchase.model";

@Injectable({
  providedIn: "root"
})
export class PurchaseService {
  private PURCHASE_URL = "https://my-json-server.typicode.com/cristoaquiza/store-json-server/purchases";
  private _purchases$ = new BehaviorSubject<Purchase[]>([]);
  readonly purchases$ = this._purchases$.asObservable();

  constructor(private http: HttpClient) {}

  public getPurchases(): void {
    this.http.get<Purchase[]>(this.PURCHASE_URL).subscribe((purchases: Purchase[]) => {
      this._purchases$.next(purchases);
    });
  }
}
