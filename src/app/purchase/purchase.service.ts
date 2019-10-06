import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Purchase } from "./purchase.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class PurchaseService {
  private PURCHASE_URL =
    "https://my-json-server.typicode.com/cristoaquiza/store-json-server/purchases";

  constructor(private http: HttpClient) {}

  public getPurchases(): Observable<Purchase[]> {
    return this.http.get<Purchase[]>(this.PURCHASE_URL);
  }
}
